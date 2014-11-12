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
	 * Find the account with the provided account number.
	 * 
	 * @param number
	 *            the account number
	 * @return the account or <code>null</code> if no account exists with that
	 *         number
	 */
	Account findAccount(String number);

}