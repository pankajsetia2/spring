package rewardsonline.rewards;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

/**
 * Tests the JDBC reward repository with a test data source to verify data
 * access and relational-to-object mapping behavior works as expected.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
@Transactional
public class RewardsControllerTests {

	@Autowired private RewardsController controller;

	@Test
	public void testShow() {
		String confirmationNumber = "1";
		Reward reward = controller.findReward(confirmationNumber);
		assertNotNull("rewards should not be null", reward);
		assertEquals("123456789", reward.getAccountNumber());
	}

}