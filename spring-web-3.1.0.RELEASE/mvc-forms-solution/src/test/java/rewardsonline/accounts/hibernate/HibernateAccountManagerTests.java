package rewardsonline.accounts.hibernate;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.List;

import javax.sql.DataSource;

import org.hibernate.SessionFactory;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import rewardsonline.accounts.Account;
import rewardsonline.accounts.AccountManager;
import rewardsonline.accounts.AccountSearchCriteria;
import rewardsonline.accounts.Beneficiary;
import test.datasource.RowAsserts;

import common.money.MonetaryAmount;
import common.money.Percentage;

/**
 * Unit test for the Hibernate-based account repository implementation. Tests
 * application data access behavior to verify the Account Hibernate mapping is
 * correct.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
@Transactional
public class HibernateAccountManagerTests {

	@Autowired private AccountManager accountManager;
	@Autowired private SessionFactory sessionFactory;
	@Autowired private DataSource dataSource;

	@Test
	public void testFindAccount() {
		Account account = accountManager.findAccount("123456789");
		// assert the returned account contains what you expect given the state
		// of the database
		// and the Account Hibernate mapping configuration
		assertNotNull("account should never be null", account);
		assertEquals("wrong account number", "123456789", account.getNumber());
		assertEquals("wrong name", "Keith and Keri Donald", account.getName());
		assertEquals("wrong beneficiary collection size", 2, account
				.getBeneficiaries().size());

		Beneficiary b1 = account.getBeneficiary("Annabelle");
		assertNotNull("Annabelle should be a beneficiary", b1);
		assertEquals("wrong savings", MonetaryAmount.valueOf("0.00"), b1
				.getSavings());
		assertEquals("wrong allocation percentage", Percentage.valueOf("50%"),
				b1.getAllocationPercentage());

		Beneficiary b2 = account.getBeneficiary("Corgan");
		assertNotNull("Corgan should be a beneficiary", b2);
		assertEquals("wrong savings", MonetaryAmount.valueOf("0.00"), b2
				.getSavings());
		assertEquals("wrong allocation percentage", Percentage.valueOf("50%"),
				b2.getAllocationPercentage());
	}

	@Test
	public void testFindAccounts() {
		AccountSearchCriteria criteria = new AccountSearchCriteria();
		criteria.setMaximumResults(2);
		List<Account> accounts = accountManager.findAccounts(criteria);
		assertNotNull("accounts should never be null", accounts);
		assertEquals(2, accounts.size());
		assertEquals("Keith and Keri Donald", accounts.get(0).getName());
		assertEquals("Riley Hollyhand", accounts.get(1).getName());

		criteria.setPage(1);
		accounts = accountManager.findAccounts(criteria);
		assertEquals(1, accounts.size());
		assertEquals("Zach Braff", accounts.get(0).getName());
	}

	@Test
	public void testUpdate() {
		Account account = accountManager.findAccount("123456789");

		account.setName("Mr. and Mrs. Donald");
		accountManager.update(account);
		sessionFactory.getCurrentSession().flush();

		RowAsserts row = new RowAsserts(dataSource,	"T_ACCOUNT", "NUMBER = '123456789'");
		row.assertColumnEquals("NAME", "Mr. and Mrs. Donald");
	}

}