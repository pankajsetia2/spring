package rewardsonline.rewards.newreward;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Uses Spring JDBC to access dining form data.
 */
@Repository("diningFormDataProvider")
public class JdbcDiningFormDataProvider implements DiningFormDataProvider {

	private JdbcTemplate jdbcTemplate;

	@Autowired
	public JdbcDiningFormDataProvider(DataSource dataSource) {
		jdbcTemplate = new JdbcTemplate(dataSource);
	}

	@Transactional(readOnly = true)
	public Map<String, String> findAllRestaurants() {
		final Map<String, String> map = new LinkedHashMap<String, String>();
		jdbcTemplate.query(
				"SELECT MERCHANT_NUMBER, NAME FROM T_RESTAURANT ORDER BY NAME",
				new RowCallbackHandler() {
					public void processRow(ResultSet rs) throws SQLException {
						map.put(rs.getString("MERCHANT_NUMBER"), rs
								.getString("NAME"));
					}
				});
		return map;
	}

}
