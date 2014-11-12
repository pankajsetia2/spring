package rewardsonline.accounts.hibernate;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import rewardsonline.accounts.Account;
import rewardsonline.accounts.AccountManager;
import rewardsonline.accounts.AccountSearchCriteria;

/**
 * An AccountManager that uses Hibernate to find and update accounts. Annotated
 * as a @Repository so Spring may auto-configure an instance of this class as a
 * bean and weave in Hibernate->DataAccessException translation behavior.
 * Methods are annotated as @Transactional so they run within a database
 * transaction.
 */
@Repository("accountManager")
public class HibernateAccountManager implements AccountManager {

	private SessionFactory sessionFactory;

	/**
	 * Creates a new Hibernate account manager.
	 * 
	 * @param sessionFactory
	 *            the Hibernate session factory
	 */
	@Autowired
	public HibernateAccountManager(@Qualifier("sessionFactory") SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	@Transactional(readOnly = true)
	@SuppressWarnings("unchecked")
	public List<Account> findAllAccounts() {
		return getCurrentSession().createQuery(
				"SELECT DISTINCT a from Account a LEFT JOIN FETCH a.beneficiaries").list();
	}

	@Transactional(readOnly = true)
	public Account findAccount(String number) {
		return (Account) getCurrentSession()
				.createQuery(
						"from Account a left join fetch a.beneficiaries where a.number = ?")
				.setString(0, number).uniqueResult();
	}

	@SuppressWarnings("unchecked")
	@Transactional(readOnly = true)
	public List<Account> findAccounts(AccountSearchCriteria searchCriteria) {
		StringBuilder searchString = new StringBuilder("%").append(
				searchCriteria.getSearchString().toUpperCase()).append("%");
		return getCurrentSession()
				.createQuery(
						"from Account a where upper(a.name) like :name order by a.name")
				.setString("name", searchString.toString()).setFirstResult(
						searchCriteria.getPage()
								* searchCriteria.getMaximumResults())
				.setMaxResults(searchCriteria.getMaximumResults()).list();
	}

	@Transactional
	public void update(Account account) {
		getCurrentSession().update(account);
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