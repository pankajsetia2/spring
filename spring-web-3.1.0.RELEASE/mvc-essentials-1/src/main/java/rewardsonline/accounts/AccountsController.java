package rewardsonline.accounts;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AccountsController {

	@Autowired
	AccountManager accountManager;
	
	@RequestMapping("/accounts")
	public String getAllAccounts(Model model){
		List<Account> accounts = accountManager.findAllAccounts();
		model.addAttribute("accounts", accounts);
		return "accounts/list";
	}
	
	@RequestMapping("/accounts/{number}")
	public String getAccount(Model model, @PathVariable("number") String number){
		Account account = accountManager.findAccount(number);
		model.addAttribute("account", account);
		return "accounts/show";
	}
}
