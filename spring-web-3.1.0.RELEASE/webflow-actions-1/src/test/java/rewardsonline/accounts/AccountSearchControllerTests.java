package rewardsonline.accounts;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertTrue;
import static rewardsonline.accounts.StubAccountManager.ACCOUNT_1_NAME;
import static rewardsonline.accounts.StubAccountManager.ACCOUNT_1_NUMBER;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.springframework.ui.ExtendedModelMap;
import org.springframework.validation.BeanPropertyBindingResult;

public class AccountSearchControllerTests {

	private AccountSearchController controller;

	@Before
	public void setUp() throws Exception {
		AccountManager accountManager = new StubAccountManager();
		controller = new AccountSearchController(accountManager);
	}

	@Test
	public void testSearchMultipleAccounts() throws Exception {
		AccountSearchCriteria criteria = new AccountSearchCriteria();
		criteria.setSearchString("a");
		criteria.setMaximumResults(5);
		BeanPropertyBindingResult result = new BeanPropertyBindingResult(
				criteria, "accountSearchCriteria");
		ExtendedModelMap model = new ExtendedModelMap();
		String view = controller.processSubmit(criteria, result, model);
		assertEquals("accounts/list", view);
		List<?> accountList = (List<?>) model.get("accountList");
		assertTrue(accountList.size() > 1);
	}

	@Test
	public void testSearchSingleAccount() throws Exception {
		AccountSearchCriteria criteria = new AccountSearchCriteria();
		criteria.setMaximumResults(5);
		criteria.setSearchString(ACCOUNT_1_NAME);
		BeanPropertyBindingResult result = new BeanPropertyBindingResult(
				criteria, "accountSearchCriteria");
		ExtendedModelMap model = new ExtendedModelMap();
		String view = controller.processSubmit(criteria, result, model);
		assertEquals("redirect:accounts/" + ACCOUNT_1_NUMBER, view);
	}

}