package rewardsonline.rewards.newreward;

import java.io.Serializable;

import javax.validation.constraints.Pattern;

import rewards.Dining;

import common.datetime.SimpleDate;
import common.money.MonetaryAmount;

/**
 * Backing bean holding values for the "Dining Form" that must be completed to
 * create a new reward.
 */
public class DiningForm implements Serializable {

	private static final long serialVersionUID = -1472633557308461762L;

	@Pattern(regexp="\\d{16}") 
	private String creditCardNumber;

	private String merchantNumber;

	private MonetaryAmount amount;

	private SimpleDate date;

	public String getCreditCardNumber() {
		return creditCardNumber;
	}

	public void setCreditCardNumber(String creditCardNumber) {
		this.creditCardNumber = creditCardNumber;
	}

	public String getMerchantNumber() {
		return merchantNumber;
	}

	public void setMerchantNumber(String merchantNumber) {
		this.merchantNumber = merchantNumber;
	}

	public MonetaryAmount getAmount() {
		return amount;
	}

	public void setAmount(MonetaryAmount amount) {
		this.amount = amount;
	}

	public SimpleDate getDate() {
		return date;
	}

	public void setDate(SimpleDate date) {
		this.date = date;
	}

	public Dining createDining() {
		return new Dining(getAmount(), getCreditCardNumber(),
				getMerchantNumber(), getDate());
	}

	public String toString() {
		return "[DiningForm creditCardNumber = '" + creditCardNumber
				+ "', merchantNumber = '" + merchantNumber + "', amount = "
				+ amount + ", date = " + date + "]";
	}
}
