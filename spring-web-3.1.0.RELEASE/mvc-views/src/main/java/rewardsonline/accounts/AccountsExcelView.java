package rewardsonline.accounts;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.web.servlet.view.document.AbstractExcelView;

/**
 * This view generates an Excel report from Account objects.
 */
public class AccountsExcelView extends AbstractExcelView {

	@Override
	@SuppressWarnings("unchecked")
	protected void buildExcelDocument(Map<String, Object> model, HSSFWorkbook workbook,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		List<Account> accounts = (List<Account>) model.get("accountList");

		HSSFCellStyle dateStyle = workbook.createCellStyle();
		dateStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("m/d/yy"));

		HSSFSheet sheet = workbook.createSheet();

		for (short i = 0; i < accounts.size(); i++) {
			Account account = accounts.get(i);
			HSSFRow row = sheet.createRow(i);
			addStringCell(row, 0, account.getName());
			addStringCell(row, 1, account.getNumber());
			addDateCell(row, 2, account.getDateOfBirth(), dateStyle);
		}
	}

	private HSSFCell addStringCell(HSSFRow row, int index, String value) {
		HSSFCell cell = row.createCell((short) index);
		cell.setCellValue(new HSSFRichTextString(value));
		return cell;
	}

	private HSSFCell addDateCell(HSSFRow row, int index, Date date,
			HSSFCellStyle dateStyle) {
		HSSFCell cell = row.createCell((short) index);
		cell.setCellValue(date);
		cell.setCellStyle(dateStyle);
		return cell;
	}

}
