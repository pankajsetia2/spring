package rewardsonline.accounts.hibernate;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import rewardsonline.accounts.Account;
import rewardsonline.accounts.AccountManager;
import rewardsonline.accounts.Beneficiary;

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

	@Test
	public void testFindAllAccounts() {
		List<Account> accounts = accountManager.findAllAccounts();
		assertNotNull("accounts should never be null", accounts);
		assertEquals(3, accounts.size());
		assertEquals("Keith and Keri Donald", accounts.get(0).getName());
		assertEquals("Riley Hollyhand", accounts.get(1).getName());
		assertEquals("Zach Braff", accounts.get(2).getName());
	}

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

}