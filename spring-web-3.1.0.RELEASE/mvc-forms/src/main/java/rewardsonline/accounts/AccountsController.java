package rewardsonline.accounts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * A controller handling requests for showing and updating an Account.
 */
@Controller
@RequestMapping("/accounts/{number}")
public class AccountsController {

	private AccountManager accountManager;

	@Autowired
	public AccountsController(AccountManager accountManager) {
		this.accountManager = accountManager;
	}

	/**
	 * Handles requests to shows detail about one account.
	 */
	@RequestMapping(method = RequestMethod.GET)
	public String show(@PathVariable String number, Model model) {
		model.addAttribute("account", accountManager.findAccount(number));
		return "accounts/show";
	}

	/**
	 * Handles requests to edit details about one account.
	 */
	@RequestMapping(value="/edit", method = RequestMethod.GET)
	public String edit(@PathVariable String number, Model model) {
		model.addAttribute("account", accountManager.findAccount(number));
		return "accounts/edit";
	}
	
	@ModelAttribute
	public Account getAccount(@PathVariable String number){
		return accountManager.findAccount(number);
	}
	
	/**
	 * Handles requests to edit details about one account.
	 */
	@RequestMapping(method = RequestMethod.POST)
	public String save(Account account, BindingResult bindingResult) {
		if(bindingResult.hasErrors()){
			return ("accounts/edit");
		}
		accountManager.update(account);
		return "redirect:" + account.getNumber();
	}
}