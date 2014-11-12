package rewards.internal.account;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashSet;
import java.util.Set;

import javax.sql.DataSource;

import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;

import rewards.InvalidCreditCardException;

import common.money.MonetaryAmount;
import common.money.Percentage;

/**
 * Loads accounts from a data source using the JDBC API.
 */
public class JdbcAccountRepository implements AccountRepository {
	
	private JdbcTemplate jdbcTemplate;
	
	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	/**
	 * Extracts an Account object from rows returned from a join of T_ACCOUNT and T_ACCOUNT_BENEFICIARY.
	 */
	private ResultSetExtractor<Account> accountExtractor = new AccountExtractor();

	@Override
	public Account findByCreditCard(String creditCardNumber) throws InvalidCreditCardException {
		String sql = "select a.ID as ID, a.NUMBER as ACCOUNT_NUMBER, a.NAME as ACCOUNT_NAME," +
				" a.EMAIL as EMAIL, a.CREDIT_CARD as CREDIT_CARD_NUMBER," +
				" a.DATE_OF_BIRTH as DATE_OF_BIRTH, a.REWARDS_NEWSLETTER as REWARDS_NEWSLETTER," +
				" a.MONTHLY_EMAIL_UPDATE as MONTHLY_EMAIL_UPDATE, b.NAME as BENEFICIARY_NAME," +
				" b.ALLOCATION_PERCENTAGE as BENEFICIARY_ALLOCATION_PERCENTAGE, b.SAVINGS as BENEFICIARY_SAVINGS " + 
			"from T_ACCOUNT a, T_ACCOUNT_BENEFICIARY b where a.ID = b.ACCOUNT_ID and a.CREDIT_CARD = ?";
		try {
		  return jdbcTemplate.query(sql, accountExtractor, creditCardNumber);
		}
		catch (EmptyResultDataAccessException e) {
			throw new InvalidCreditCardException(creditCardNumber);
		}
	}

	@Override
	public Account findByAccountNumber(String accountNumber) {
		String sql = "select a.ID as ID, a.NUMBER as ACCOUNT_NUMBER, a.NAME as ACCOUNT_NAME," +
			" a.EMAIL as EMAIL, a.CREDIT_CARD as CREDIT_CARD_NUMBER," +
			" a.DATE_OF_BIRTH as DATE_OF_BIRTH, a.REWARDS_NEWSLETTER as REWARDS_NEWSLETTER," +
			" a.MONTHLY_EMAIL_UPDATE as MONTHLY_EMAIL_UPDATE, b.NAME as BENEFICIARY_NAME," +
			" b.ALLOCATION_PERCENTAGE as BENEFICIARY_ALLOCATION_PERCENTAGE, b.SAVINGS as BENEFICIARY_SAVINGS " + 
		"from T_ACCOUNT a, T_ACCOUNT_BENEFICIARY b where a.ID = b.ACCOUNT_ID and a.NUMBER = ?";
	return jdbcTemplate.query(sql, accountExtractor, accountNumber);

	}
	
	@Override
	public void updateBeneficiaries(Account account) {
		String sql = "update T_ACCOUNT_BENEFICIARY SET SAVINGS = ? where ACCOUNT_ID = ? and NAME = ?";
		for (Beneficiary b : account.getBeneficiaries()) {
			jdbcTemplate.update(sql, b.getSavings().asBigDecimal(), account.getEntityId(), b.getName());
		}
	}

	private static class AccountExtractor implements ResultSetExtractor<Account> {
		/**
		 * Map the rows returned from the join of T_ACCOUNT and T_ACCOUNT_BENEFICIARY to an fully-reconstituted Account
		 * aggregate.
		 * 
		 * @param rs the set of rows returned from the query
		 * @return the mapped Account aggregate
		 * @throws SQLException an exception occurred extracting data from the result set
		 */
		public Account extractData(ResultSet rs) throws SQLException, DataAccessException {
			if (!rs.next()) {
				throw new EmptyResultDataAccessException(1);
			}

			Set<Beneficiary> beneficiaries = new HashSet<Beneficiary>();
				String number = rs.getString("ACCOUNT_NUMBER");
				String name = rs.getString("ACCOUNT_NAME");
				String email = rs.getString("EMAIL");
				Account account = new Account(number, name);
				account.setEmail(email);
				account.setCreditCardNumber(rs.getString("CREDIT_CARD_NUMBER"));
				account.setReceiveNewsletter(rs.getString("REWARDS_NEWSLETTER").equals("T"));
				account.setReceiveMonthlyEmailUpdate(rs.getString("MONTHLY_EMAIL_UPDATE").equals("T"));

				// Set internal entity identifier (primary key)
				account.setEntityId(rs.getInt("ID"));
			
			// build out the account object graph from the returned rows
			do {
				beneficiaries.add(mapBeneficiary(rs));
			} while (rs.next());
			
			account.setBeneficiaries(beneficiaries);
			return account;
		}

		/**
		 * Maps the beneficiary columns in a single row to an AllocatedBeneficiary object.
		 * 
		 * @param rs the result set with its cursor positioned at the current row
		 * @return an allocated beneficiary
		 * @throws SQLException an exception occurred extracting data from the result set
		 */
		private Beneficiary mapBeneficiary(ResultSet rs) throws SQLException {
			String name = rs.getString("BENEFICIARY_NAME");
			MonetaryAmount savings = MonetaryAmount.valueOf(rs.getString("BENEFICIARY_SAVINGS"));
			Percentage allocationPercentage = Percentage.valueOf(rs.getString("BENEFICIARY_ALLOCATION_PERCENTAGE"));
			return new Beneficiary(name, allocationPercentage, savings);
		}

	}
}