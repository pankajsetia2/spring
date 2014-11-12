package rewards.testdb;

import java.util.Date;
import java.util.Random;

import rewards.AccountContribution;
import rewards.Dining;
import rewards.RewardConfirmation;
import rewards.internal.reward.Reward;
import rewards.internal.reward.RewardRepository;

import common.money.MonetaryAmount;

/**
 * A dummy reward repository implementation.
 */
public class StubRewardRepository implements RewardRepository {

	@Override
	public RewardConfirmation confirmReward(AccountContribution contribution,
			Dining dining) {
		return new RewardConfirmation(confirmationNumber(), contribution);
	}

	private String confirmationNumber() {
		return new Random().toString();
	}

	@Override
	public Reward findReward(String confirmationNumber) {
		return new Reward(confirmationNumber, "123456789", "1234567890", new Date(), MonetaryAmount.valueOf("25.0"));
	}
}