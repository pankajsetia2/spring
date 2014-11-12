package rewardsonline.accounts;

import java.util.ArrayList;
import java.util.List;

/**
 * Static stub used to support unit testing objects that depend on the
 * AccountManager interface.
 */
public class StubAccountManager implements AccountManager {

	public Account findAccount(String number) {
		return new Account("123456789", "Keith");
	}

	public List<Account> findAllAccounts() {
		List<Account> accounts = new ArrayList<Account>();
		accounts.add(new Account("12456789", "Keith"));
		return accounts;
	}

}
