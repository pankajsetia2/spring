package rewardsonline.accounts;

import java.util.List;

/**
 * Manages access to member account information.
 */
public interface AccountManager {

	/**
	 * Return a listing of all accounts.
	 * 
	 * @return the account listing
	 */
	List<Account> findAllAccounts();

	/**
	 * Return the list of accounts that match the criteria provided.
	 * 
	 * @param searchCriteria
	 *            the search criteria
	 * @return the list of accounts that match
	 */
	List<Account> findAccounts(AccountSearchCriteria searchCriteria);

	/**
	 * Find the account with the provided account number.
	 * 
	 * @param number
	 *            the account number
	 * @return the account or <code>null</code> if no account exists with that
	 *         number
	 */
	Account findAccount(String number);

	/**
	 * Mark an account entity as changed and needing an update on flush.
	 * 
	 * @param account
	 *            the account object with changes
	 */
	void update(Account account);

}