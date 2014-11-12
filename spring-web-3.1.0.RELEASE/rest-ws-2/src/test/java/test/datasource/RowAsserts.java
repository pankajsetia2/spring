package test.datasource;

import java.util.Iterator;
import java.util.Map;

import javax.sql.DataSource;

import org.junit.Assert;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 * A test utility for asserting expected column values for a row in a database
 * table.
 */
public class RowAsserts {

	private JdbcTemplate template;

	private String table;

	private String rowSelector;

	/**
	 * Create a new RowAsserts to assert row column values.
	 * 
	 * @param dataSource
	 *            to access the database
	 * @param table
	 *            the database table to query
	 * @param rowSelector
	 *            the SQL where clause that will select the row; should select a
	 *            unique row
	 */
	public RowAsserts(DataSource dataSource, String table, String rowSelector) {
		this.template = new JdbcTemplate(dataSource);
		this.table = table;
		this.rowSelector = rowSelector;
	}

	/**
	 * Assert that the column has the expected value.
	 * 
	 * @param column
	 *            the name of the column
	 * @param expectedValue
	 *            the expected column value
	 */
	public void assertColumnEquals(String column, Object expectedValue) {
		Map<?, ?> results = template.queryForMap("select " + column + " from "
				+ table + " where " + rowSelector);
		Assert.assertEquals("Expected a single row->column result", 1, results
				.size());
		Assert.assertEquals("'" + column + "' not equal to expected value",
				expectedValue, results.get(column));
	}

	/**
	 * Assert that the columns have their expected values.
	 * 
	 * @param expectedValues
	 *            the expected column values; each map key is the column name;
	 *            the value is the column value
	 */
	public void assertColumnsEqual(Map<String, Object> expectedValues) {
		StringBuffer columns = new StringBuffer();
		for (Iterator<String> it = expectedValues.keySet().iterator(); it
				.hasNext();) {
			String column = it.next();
			columns.append(column);
			if (it.hasNext()) {
				columns.append(", ");
			}
		}
		Map<?, ?> results = template.queryForMap("select " + columns + " from "
				+ table + " where " + rowSelector);
		for (Map.Entry<String, Object> entry : expectedValues.entrySet()) {
			Assert.assertEquals("'" + entry.getKey()
					+ "' not equal to expected value", entry.getValue(),
					results.get(entry.getKey()));
		}
	}

	/**
	 * Assert that the table row count equals the number provided.
	 * 
	 * @param expectedValue
	 *            the expected table row count
	 */
	public void assertTableRowCount(int expectedValue) {
		int actualValue = template.queryForInt("select count(*) from " + table);
		Assert.assertEquals("'" + table
				+ "' table row count does not equal expected value",
				expectedValue, actualValue);
	}

}
