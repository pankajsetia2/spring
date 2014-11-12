package rewardsonline.accounts;

import static junit.framework.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Before;
import org.junit.Test;
import org.springframework.ui.ExtendedModelMap;
import org.springframework.ui.Model;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

/**
 * A JUnit test case testing the AccountController.
 */
public class AccountsControllerTests {

	protected static final String TEST_ACCOUNT = "123456789";
	protected static final String NEW_ACCOUNT = "123456789";
	private AccountsController controller;

	@Before
	public void setUp() throws Exception {
		controller = new AccountsController(new StubAccountManager());
	}

	@Test
	public void testShow() throws Exception {
		Account account = (Account) controller.findAccount(TEST_ACCOUNT);
		String view = controller.show();
		assertNotNull(view);
		assertEquals("accounts/show", view);
		assertNotNull(account);
		assertEquals(TEST_ACCOUNT, account.getNumber());
	}

	@Test
	public void testEdit() throws Exception {
		String view = controller.edit();
		assertEquals("accounts/edit", view);
	}

	@Test
	public void testSave() {
		Account account = new Account("112233445", "Fred Smith");
		String successView = "redirect:" + account.getNumber();
		String errorView = "accounts/edit";
		BindingResult result = new BeanPropertyBindingResult(account, "account");
		Model model = new ExtendedModelMap();

		String view1 = controller.save(account, result, model);
		assertEquals(successView, view1);

		result.addError(new ObjectError("account", "broken"));
		String view2 = controller.save(account, result, model);
		assertEquals(errorView, view2);
	}

	public void testAccountDetails() {
		String accountNumber = TEST_ACCOUNT;
		Account account = controller.accountDetails(accountNumber);
		assertNotNull(account);
	}
}
