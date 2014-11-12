package rewardsonline.accounts;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.atomic.AtomicInteger;

import common.money.Percentage;

/**
 * A dummy implementation of an account manager storing all account data in
 * memory. Useful for testing only.
 */
public class StubAccountManager implements AccountManager {

	private Map<String, Account> accountsByNumber = new HashMap<String, Account>();

	private AtomicInteger nextEntityId = new AtomicInteger();

	public StubAccountManager() {
		Account account = new Account("123456789", "Keith and Keri Donald");
		account.addBeneficiary("Annabelle", Percentage.valueOf("50%"));
		account.addBeneficiary("Corgan", Percentage.valueOf("50%"));
		account.setEntityId(nextEntityId.getAndIncrement());
		accountsByNumber.put(account.getNumber(), account);
	}

	@Override
	public List<Account> findAllAccounts() {
		return new ArrayList<Account>(accountsByNumber.values());
	}

	@Override
	public List<Account> findAccounts(AccountSearchCriteria searchCriteria) {
		List<Account> results = new ArrayList<Account>();
		String searchString = searchCriteria.getSearchString().toUpperCase();
		int min = searchCriteria.getPage() * searchCriteria.getMaximumResults();
		int max = min + searchCriteria.getMaximumResults();
		int found = 0;

		for (Account account : accountsByNumber.values()) {
			if (!account.getName().toUpperCase().contains(searchString))
				continue;

			if (found++ < min)  // Skip the first min results
				results.add(account);

			if (found > max)   // Check if limit reached
				break;
		}

		return results;
	}

	@Override
	public Account findAccount(String number) {
		return accountsByNumber.get(number);
	}
	
	public void update(Account account) {
		accountsByNumber.put(account.getNumber(), account);
	}

	public void updateBeneficiaryAllocationPercentages(String accountNumber,
			Map<String, Percentage> allocationPercentages) {
		Account account = accountsByNumber.get(accountNumber);
		for (Entry<String, Percentage> entry : allocationPercentages.entrySet()) {
			account.getBeneficiary(entry.getKey()).setAllocationPercentage(
					entry.getValue());
		}
	}

	public void addBeneficiary(String accountNumber, String beneficiaryName) {
		accountsByNumber.get(accountNumber).addBeneficiary(beneficiaryName,
				Percentage.zero());
	}

	public void removeBeneficiary(String accountNumber, String beneficiaryName,
			Map<String, Percentage> allocationPercentages) {
		accountsByNumber.get(accountNumber).removeBeneficiary(beneficiaryName);
		updateBeneficiaryAllocationPercentages(accountNumber, allocationPercentages);
	}

	public void removeBeneficiary(String accountNumber, String beneficiaryName) {
		accountsByNumber.get(accountNumber).removeBeneficiary(beneficiaryName);
		// should preserve invariant that total of percentages == 100, but never
		// mind that...
	}

	public Account save(Account newAccount) {
		for (Beneficiary beneficiary : newAccount.getBeneficiaries()) {
			beneficiary.setEntityId(nextEntityId.getAndIncrement());
		}
		newAccount.setEntityId(nextEntityId.getAndIncrement());
		accountsByNumber.put(newAccount.getNumber(), newAccount);
		return newAccount;
	}

}
