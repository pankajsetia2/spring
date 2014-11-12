package rewardsonline.accounts;

import static junit.framework.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static rewardsonline.accounts.StubAccountManager.ACCOUNT_1_NUMBER;

import org.junit.Before;
import org.junit.Test;
import org.springframework.ui.ExtendedModelMap;
import org.springframework.validation.BeanPropertyBindingResult;

public class AccountsControllerTests {

	private AccountsController controller;

	@Before
	public void setUp() throws Exception {
		controller = new AccountsController(new StubAccountManager());
	}

	@Test
	public void testSaveEdit() {
		Account account = new Account("1", "joe");
		BeanPropertyBindingResult result = new BeanPropertyBindingResult(
				account, "account");
		ExtendedModelMap model = new ExtendedModelMap();
		String view = controller.save(account, result, model);
		assertEquals("redirect:" + account.getNumber(), view);
	}

	@Test
	public void testModelAttributeFactoryMethodFindAccount() throws Exception {
		Account account = controller.findAccount(ACCOUNT_1_NUMBER);
		assertNotNull(account);
	}

}