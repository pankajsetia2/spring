package rewardsonline.accounts;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import common.money.MonetaryAmount;
import common.money.Percentage;

public class StubAccountManager implements AccountManager {

	public static final String ACCOUNT_1_NUMBER = "100000001";

	public static final String ACCOUNT_2_NUMBER = "100000002";

	public static final String ACCOUNT_1_NAME = "Glenda Smith";

	public static final String ACCOUNT_2_NAME = "Julia Weber";

	private Map<String, Account> accountsByNumber = new HashMap<String, Account>();

	public StubAccountManager() {
		Set<Beneficiary> beneficiaries = new LinkedHashSet<Beneficiary>();
		beneficiaries.add(new Beneficiary("Leslie", Percentage.valueOf("50%"),
				MonetaryAmount.zero()));
		beneficiaries.add(new Beneficiary("Weslie", Percentage.valueOf("50%"),
				MonetaryAmount.zero()));

		Account account = new Account(ACCOUNT_1_NUMBER, ACCOUNT_1_NAME);
		account.setBeneficiaries(beneficiaries);
		accountsByNumber.put(ACCOUNT_1_NUMBER, account);

		account = new Account(ACCOUNT_2_NUMBER, ACCOUNT_2_NAME);
		accountsByNumber.put(ACCOUNT_2_NUMBER, account);
	}

	public List<Account> findAllAccounts() {
		return new ArrayList<Account>(accountsByNumber.values());
	}

	public List<Account> findAccounts(AccountSearchCriteria criteria) {
		int count = 0;
		List<Account> accounts = new ArrayList<Account>();
		Iterator<Account> it = accountsByNumber.values().iterator();
		while (it.hasNext()) {
			Account account = it.next();
			if (account.getName().toLowerCase().contains(
					criteria.getSearchString().toLowerCase())) {
				accounts.add(account);
				count++;
			}
			if (count == criteria.getMaximumResults()) {
				break;
			}
		}
		return accounts;
	}

	public Account findAccount(String number) {
		return accountsByNumber.get(number);
	}

	public void update(Account account) {
		accountsByNumber.put(account.getNumber(), account);
	}
}
