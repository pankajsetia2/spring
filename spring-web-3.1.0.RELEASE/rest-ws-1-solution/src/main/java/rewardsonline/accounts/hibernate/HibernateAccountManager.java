package rewardsonline.accounts.hibernate;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import rewardsonline.accounts.Account;
import rewardsonline.accounts.AccountManager;
import rewardsonline.accounts.AccountSearchCriteria;
import rewardsonline.accounts.Beneficiary;

import common.money.Percentage;

/**
 * An account manager that uses Hibernate to find accounts.
 */
@Repository
@Transactional
public class HibernateAccountManager implements AccountManager {

	private SessionFactory sessionFactory;

	/**
	 * Creates a new Hibernate account manager.
	 * 
	 * @param sessionFactory
	 *            the Hibernate session factory
	 */
	@Autowired
	public HibernateAccountManager(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	@Transactional(readOnly = true)
	@SuppressWarnings("unchecked")
	public List<Account> findAllAccounts() {
		return getCurrentSession().createQuery(
				"SELECT DISTINCT a from Account a LEFT JOIN FETCH a.beneficiaries").list();
	}

	@Override
	public Account findAccount(final String accountNumber) {
		
		try {
			return getAccount(accountNumber);
		} catch (DataAccessException e) {
			return null;
		}
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<Account> findAccounts(AccountSearchCriteria searchCriteria) {
		StringBuilder searchString = new StringBuilder("%").append(
				searchCriteria.getSearchString().toUpperCase()).append("%");
		return (List<Account>) getCurrentSession()
				.createQuery(
						"from Account a where upper(a.name) like :name order by a.name")
				.setString("name", searchString.toString())
				.setFirstResult(
						searchCriteria.getPage()
								* searchCriteria.getMaximumResults())
				.setMaxResults(searchCriteria.getMaximumResults()).list();
	}

	public void update(Account account) {
		getCurrentSession().update(account);
	}

	public Account save(Account newAccount) {
		getCurrentSession().persist(newAccount);
		return newAccount;
	}

	public void updateBeneficiaryAllocationPercentages(String accountNumber,
			Map<String, Percentage> allocationPercentages) {
		Account account = getAccount(accountNumber);
		for (Entry<String, Percentage> entry : allocationPercentages.entrySet()) {
			account.getBeneficiary(entry.getKey()).setAllocationPercentage(
					entry.getValue());
		}
	}

	public void addBeneficiary(String accountNumber, String beneficiaryName) {
		getAccount(accountNumber).addBeneficiary(beneficiaryName,
				Percentage.zero());
	}

	public void removeBeneficiary(String accountNumber, String beneficiaryName,
			Map<String, Percentage> allocationPercentages) {
		getAccount(accountNumber).removeBeneficiary(beneficiaryName);
		updateBeneficiaryAllocationPercentages(accountNumber,
				allocationPercentages);
	}

	public void removeBeneficiary(String accountNumber, String beneficiaryName) {
		Account account = getAccount(accountNumber);
		Beneficiary beneficiaryToRemove = account
				.getBeneficiary(beneficiaryName);
		account.removeBeneficiary(beneficiaryName);
		Set<Beneficiary> remainingBeneficiaries = account.getBeneficiaries();
		if (remainingBeneficiaries.isEmpty())
			return;
		Percentage extra = new Percentage(beneficiaryToRemove
				.getAllocationPercentage().asBigDecimal()
				.divide(BigDecimal.valueOf(remainingBeneficiaries.size())));
		for (Beneficiary beneficiary : remainingBeneficiaries) {
			beneficiary.setAllocationPercentage(beneficiary
					.getAllocationPercentage().add(extra));
		}
	}

	/**
	 * Find an account or throw an exception if it doesn't exist.
	 * 
	 * @param accountNumber
	 *            the account to find.
	 * @return The account, if it exists.
	 * @exception DataAccessException
	 *                No such account.
	 */
	protected Account getAccount(String accountNumber) {
		return (Account) getCurrentSession()
				.createQuery(
						"from Account a LEFT JOIN FETCH a.beneficiaries where number = :number")
				.setParameter("number", accountNumber).uniqueResult();
	}

	/**
	 * Returns the session associated with the ongoing transaction.
	 * 
	 * @return the current session
	 */
	protected Session getCurrentSession() {
		return sessionFactory.getCurrentSession();
	}

}