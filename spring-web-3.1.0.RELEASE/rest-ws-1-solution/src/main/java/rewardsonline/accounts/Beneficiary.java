package rewardsonline.accounts;

import java.math.BigDecimal;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import common.money.MonetaryAmount;
import common.money.Percentage;

/**
 * A single beneficiary allocated to an account. Each beneficiary has a name
 * (e.g. Annabelle) and a savings balance tracking how much money has been saved
 * for he or she to date (e.g. $1000). Scoped by the Account aggregate.
 */
@Entity
@Table(name = "T_ACCOUNT_BENEFICIARY")
public class Beneficiary {

	@Id
	@Column(name = "ID")
	@SuppressWarnings("unused")
	@GeneratedValue
	private Integer entityId;

	@Column(name = "NAME")
	private String name;

	//@Embedded
	//@AttributeOverride(name = "value", column = @Column(name = "ALLOCATION_PERCENTAGE"))
	@Column(name = "ALLOCATION_PERCENTAGE")
	private BigDecimal allocationPercentage;

	@Embedded
	@AttributeOverride(name = "value", column = @Column(name = "SAVINGS"))
	private MonetaryAmount savings = MonetaryAmount.valueOf("0.00");

	/**
	 * Required by JPA and Jackson.
	 */
	protected Beneficiary() {
	}

	public Beneficiary(String beneficiaryName, Percentage allocationPercentage,
			MonetaryAmount savings) {
		this.name = beneficiaryName;
		this.allocationPercentage = allocationPercentage.asBigDecimal();
		this.savings = savings;
	}

	public Beneficiary(String beneficiaryName, Percentage allocationPercentage) {
		this.name = beneficiaryName;
		this.allocationPercentage = allocationPercentage.asBigDecimal();
	}

	/**
	 * Returns the name of the beneficiary.
	 * 
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * Returns the percentage this beneficiary has been allocated vs other
	 * beneficiaries of the same account.
	 * 
	 * @return the allocation percentage
	 */
	public Percentage getAllocationPercentage() {
		return new Percentage(allocationPercentage);
	}

	/**
	 * Returns the total savings accrued by this beneficiary.
	 * 
	 * @return the total savings
	 */
	public MonetaryAmount getSavings() {
		return savings;
	}

	/**
	 * Set entity id. Only intended for Jackson JSON deserialiser and test
	 * classes.
	 * 
	 * @param entityId
	 *            New id for the beneficiary.
	 */
	void setEntityId(Integer entityId) {
		this.entityId = entityId;
	}

	/**
	 * Sets the name on file for this account. Only intended for Jackson JSON
	 * deserialiser and test classes.
	 * 
	 * @param name
	 *            The name for this account
	 */
	void setName(String name) {
		this.name = name;
	}

	/**
	 * Initialise the savings for this beneficiary. Only intended for Jackson
	 * JSON deserialiser and test classes.
	 * 
	 * @param savings
	 */
	void setSavings(MonetaryAmount savings) {
		this.savings = savings;
	}

	/**
	 * Modify the this beneficiary has been allocated.
	 * 
	 * @param value
	 */
	public void setAllocationPercentage(Percentage value) {
		allocationPercentage = value.asBigDecimal();
	}

	public String toString() {
		return "[Beneficiary name = '" + name + "', allocationPercentage = "
				+ allocationPercentage + ", savings = " + savings + "]";
	}
}