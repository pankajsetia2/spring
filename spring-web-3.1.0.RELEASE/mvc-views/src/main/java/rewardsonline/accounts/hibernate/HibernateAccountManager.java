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

/**
 * An AccountManager that uses Hibernate to work with accounts.
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

	@SuppressWarnings("unchecked")
	@Transactional(readOnly = true)
	public List<Account> findAllAccounts() {
		// TODO Switch queries when told to
		String queryAccounts = "from Account order by name";
		//String eagerQuery = "from Account a join fetch a.beneficiaries order by name";
		
		return getCurrentSession().createQuery(queryAccounts).list();
	}

	@Transactional(readOnly = true)
	public Account findAccount(String number) {
		return (Account) getCurrentSession()
				.createQuery(
						"from Account a left join fetch a.beneficiaries where a.number = ?")
				.setString(0, number).uniqueResult();
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