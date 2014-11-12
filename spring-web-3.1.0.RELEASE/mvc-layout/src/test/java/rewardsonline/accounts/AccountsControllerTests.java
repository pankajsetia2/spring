package rewardsonline.accounts;

import static junit.framework.Assert.assertEquals;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.springframework.ui.ExtendedModelMap;

/**
 * Unit test for the AccountController implementation.
 */
public class AccountsControllerTests {

	private AccountsController controller;

	private StubAccountManager accountManager;

	@Before
	public void setUp() throws Exception {
		accountManager = new StubAccountManager();
		controller = new AccountsController(accountManager);
	}

	@Test
	@SuppressWarnings("unchecked")
	public void testList() throws Exception {
		ExtendedModelMap model = new ExtendedModelMap();
		String view = controller.list(model);
		assertEquals("accounts/list", view);
		assertEquals(1, ((List<Account>) model.get("accountList")).size());
	}

	@Test
	public void testShow() throws Exception {
		ExtendedModelMap model = new ExtendedModelMap();
		String view = controller.show("123456789", model);
		assertEquals("accounts/show", view);
		assertEquals("123456789", ((Account) model.get("account")).getNumber());
	}

}