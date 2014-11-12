package rewardsonline.accounts;

import java.util.List;
import java.util.Map;

import common.money.Percentage;

/**
 * Manages access to account information.
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
	 * @param accountNumber
	 *            the account number
	 * @return the account or <code>null</code> if no account exists with that
	 *         number
	 */
	Account findAccount(String accountNumber);

	/**
	 * Search for accounts in the system
	 * 
	 * @return all accounts
	 */
	List<Account> findAccounts(AccountSearchCriteria searchCriteria);

	/**
	 * Takes a changed account and persists any changes made to it.
	 * 
	 * @param account
	 *            The account with changes
	 */
	void update(Account account);

	/**
	 * Takes a new account and persists it with its beneficiaries.
	 * 
	 * @param newAccount
	 *            new account (without entityId) with new beneficiaries
	 * @return the saved Account, including its entityId
	 */
	Account save(Account newAccount);

	/**
	 * Updates the allocation percentages for the entire collection of
	 * beneficiaries in an account
	 * 
	 * @param accountNumber
	 *            the account number
	 * @param allocationPercentages
	 *            A map of beneficiary names and allocation percentages
	 */
	void updateBeneficiaryAllocationPercentages(String accountnumber,
			Map<String, Percentage> allocationPercentages);

	/**
	 * Adds a beneficiary to an account. The new beneficiary will have a 0
	 * allocation percentage.
	 * 
	 * @param accountNumber
	 *            the account number
	 * @param beneficiaryName
	 *            the name of the beneficiary to remove
	 */
	void addBeneficiary(String accountNumber, String beneficiaryName);

	/**
	 * Removes a beneficiary from an account.
	 * 
	 * @param accountNumber
	 *            the account number
	 * @param beneficiaryName
	 *            the name of the beneficiary to remove
	 * @param allocationPercentages
	 *            new allocation percentages
	 */
	void removeBeneficiary(String accountNumber, String beneficiaryName,
			Map<String, Percentage> allocationPercentages);

	/**
	 * Removes a beneficiary from an account, evenly distributing its allocation
	 * percentage over the remaining beneficiaries.
	 * 
	 * @param accountNumber
	 *            the account number
	 * @param beneficiaryName
	 *            the name of the beneficiary to remove
	 */
	void removeBeneficiary(String accountNumber, String beneficiaryName);
}
