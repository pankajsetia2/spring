package rewardsonline.accounts;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.ui.Model;
import org.springframework.validation.support.BindingAwareModelMap;

import rewardsonline.accounts.AccountsController;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
public class AccountsControllerTest {

	@Autowired
	AccountsController accountsController;
	
	@Test
	public void test1(){
		assertNotNull("welcome should never be null", accountsController.getAllAccounts(new BindingAwareModelMap()));
//				.welcome());
//		assertEquals("welcome", welcomeController.welcome());
	}
}
