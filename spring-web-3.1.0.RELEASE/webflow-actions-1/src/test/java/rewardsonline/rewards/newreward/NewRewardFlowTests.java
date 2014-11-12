package rewardsonline.rewards.newreward;

import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.webflow.config.FlowDefinitionResource;
import org.springframework.webflow.config.FlowDefinitionResourceFactory;
import org.springframework.webflow.test.MockExternalContext;
import org.springframework.webflow.test.MockFlowBuilderContext;
import org.springframework.webflow.test.execution.AbstractXmlFlowExecutionTests;

import rewards.AccountContribution;
import rewards.AccountContribution.Distribution;
import rewards.Dining;
import rewards.RewardConfirmation;
import rewards.RewardNetwork;
import rewards.RewardNetworkException;

import common.datetime.SimpleDate;
import common.money.MonetaryAmount;

public class NewRewardFlowTests extends AbstractXmlFlowExecutionTests {

	private static final String ENTER_DINING_INFORMATION = "enterDiningInformation";

	private static final String REVIEW_REWARD = "reviewReward";

	private static final String REWARD_CONFIRMED = "rewardConfirmed";

	private DiningForm diningForm;

	@Override
	protected void setUp() throws Exception {
		diningForm = new DiningForm();
		diningForm.setCreditCardNumber("1234123412341234");
		diningForm
				.setMerchantNumber(StubDiningFormDataProvider.RESTAURANT_APPLEBEES);
		diningForm.setAmount(MonetaryAmount.valueOf("100"));
		diningForm.setDate(SimpleDate.today());
	}

	@Override
	protected FlowDefinitionResource getResource(
			FlowDefinitionResourceFactory resourceFactory) {
		return resourceFactory
				.createFileResource("src/main/webapp/WEB-INF/rewards/newReward/newReward-flow.xml");
	}

	@Override
	protected void configureFlowBuilderContext(
			MockFlowBuilderContext builderContext) {
		// TODO: register a "diningFormDataProvider" and "rewardNetwork" beans.
	}

	public void testStart() throws Exception {
		startFlow(new MockExternalContext());
		assertCurrentStateEquals(ENTER_DINING_INFORMATION);
		// TODO: assert "diningForm" variable has been created
	}

	public void testEnterDiningInformation_Reward() throws Exception {
		setCurrentState(ENTER_DINING_INFORMATION);
		getFlowScope().put("diningForm", diningForm);
		MockExternalContext externalContext = new MockExternalContext();
		externalContext.setEventId("reward");
		resumeFlow(externalContext);
		assertCurrentStateEquals(REVIEW_REWARD);
		// TODO: assert "accountContribution" flow variable has been created and
		// has an amount of 25.00
	}

	public void testReviewReward_Confirm() throws Exception {
		setCurrentState(REVIEW_REWARD);
		getFlowScope().put("diningForm", diningForm);
		MockExternalContext externalContext = new MockExternalContext();
		externalContext.setEventId("confirm");
		resumeFlow(externalContext);
		assertFlowExecutionEnded();
		assertFlowExecutionOutcomeEquals(REWARD_CONFIRMED);
		assertTrue(externalContext.getExternalRedirectRequested());
		assertEquals("contextRelative:/rewards/12345",
				externalContext.getExternalRedirectUrl());
	}

	public static class StubRewardNetwork implements RewardNetwork {

		public AccountContribution calculateContributionFor(Dining dining)
				throws RewardNetworkException {
			Set<Distribution> distributions = new LinkedHashSet<Distribution>();
			AccountContribution contribution = new AccountContribution(
					"123456789", new MonetaryAmount(25.00), distributions);
			return contribution;
		}

		public RewardConfirmation rewardAccountFor(Dining dining)
				throws RewardNetworkException {
			return new RewardConfirmation("12345",
					calculateContributionFor(dining));
		}

	}

	public static class StubDiningFormDataProvider implements
			DiningFormDataProvider {

		public static final String RESTAURANT_APPLEBEES = "1";

		public static final String RESTAURANT_SUBWAY = "2";

		private Map<String, String> restaurants;

		public StubDiningFormDataProvider() {
			final Map<String, String> map = new LinkedHashMap<String, String>();
			map.put(RESTAURANT_APPLEBEES, "Applebees");
			map.put(RESTAURANT_SUBWAY, "Subway");
		}

		public Map<String, String> findAllRestaurants() {
			return restaurants;
		}

	}
}
