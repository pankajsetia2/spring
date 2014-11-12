package rewardsonline.rewards;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import common.money.MonetaryAmount;

/**
 * Controls the execution of operations on individual Reward entities.
 */
@Controller
public class RewardsController {

	private JdbcTemplate jdbcTemplate;

	private RewardMapper rewardMapper = new RewardMapper();

	/**
	 * Creates a new RewardController
	 * 
	 * @param dataSource
	 *            the factory used to acquire database connections
	 */
	@Autowired
	public RewardsController(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	/**
	 * Controls showing details of a reward to the user.
	 * 
	 * @param confirmationNumber
	 *            the confirmation number of the reward to display
	 * @return the Reward to show
	 */
	@RequestMapping(value="/rewards/{confirmationNumber}", method = RequestMethod.GET)
	public String show(@PathVariable String confirmationNumber, Model model) {
		model.addAttribute(findReward(confirmationNumber));
		return "rewards/show";
	}

	protected Reward findReward(String confirmationNumber) {
		return jdbcTemplate.queryForObject(
				"select * from T_REWARD where CONFIRMATION_NUMBER = ?",
				rewardMapper, confirmationNumber);
	}

	/**
	 * Encapsulates the logic to map a row in a ResultSet to a Reward object.
	 */
	private static class RewardMapper implements RowMapper<Reward> {
		public Reward mapRow(ResultSet rs, int rowNum) throws SQLException {
			return new Reward(rs.getString("CONFIRMATION_NUMBER"), rs
					.getString("ACCOUNT_NUMBER"), rs
					.getString("DINING_MERCHANT_NUMBER"), rs
					.getDate("DINING_DATE"), new MonetaryAmount(rs
					.getDouble("REWARD_AMOUNT")));
		}
	}

}
