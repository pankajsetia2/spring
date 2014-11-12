package rewardsonline.accounts;

import common.money.MonetaryAmount;
import common.money.Percentage;

/**
 * A single beneficiary allocated to an account. Each beneficiary has a name (e.g. Annabelle) and a savings balance
 * tracking how much money has been saved for he or she to date (e.g. $1000). Scoped by the Account aggregate.
 */
public class Beneficiary {

	@SuppressWarnings("unused")
	private Long entityId;

	private String name;

	private Percentage allocationPercentage;

	private MonetaryAmount savings = MonetaryAmount.valueOf("0.00");

	@SuppressWarnings("unused")
	private Beneficiary() {
	}

	Beneficiary(String name, Percentage allocationPercentage, MonetaryAmount savings) {
		this.name = name;
		this.allocationPercentage = allocationPercentage;
		this.savings = savings;
	}

	/**
	 * Returns the name of the beneficiary.
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * Returns the percentage this beneficiary has been allocated vs other beneficiaries.
	 * @return the allocation percentage
	 */
	public Percentage getAllocationPercentage() {
		return allocationPercentage;
	}

	/**
	 * Returns the total savings accrued by this beneficiary.
	 * @return the total savings
	 */
	public MonetaryAmount getSavings() {
		return savings;
	}

	public String toString() {
		return "[Beneficiary name = '" + name + "', allocationPercentage = " + allocationPercentage + ", savings = " + savings + "]";
	}
}