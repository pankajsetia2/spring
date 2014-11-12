package rewardsonline.accounts;

import java.util.ArrayList;
import java.util.List;

public class StubAccountManager implements AccountManager {

	public Account findAccount(String number) {
		return new Account("123456789", "Keith");
	}

	public List<Account> findAllAccounts() {
		List<Account> accounts = new ArrayList<Account>();
		accounts.add(new Account("12456789", "Keith"));
		return accounts;
	}

	public void update(Account account) {
		throw new IllegalStateException("Should not be called for test");
	}

	public List<Account> findAccounts(AccountSearchCriteria searchCriteria) {
		throw new IllegalStateException("Should not be called for test");
	}

}
