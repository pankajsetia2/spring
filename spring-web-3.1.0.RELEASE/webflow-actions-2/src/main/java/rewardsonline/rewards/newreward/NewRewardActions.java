package rewardsonline.rewards.newreward;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.binding.message.MessageBuilder;
import org.springframework.stereotype.Component;
import org.springframework.webflow.action.MultiAction;
import org.springframework.webflow.execution.Event;
import org.springframework.webflow.execution.RequestContext;

import rewards.AccountContribution;
import rewards.InvalidCreditCardException;
import rewards.RewardNetwork;
import rewards.RewardNetworkException;



@Component("newnewAction")
public class NewRewardActions extends MultiAction{

	@Autowired
	RewardNetwork rewardNetwork;
	
	public Event calcCont(RequestContext ctx){
		try{
			DiningForm diningForm = (DiningForm)ctx.getFlowScope().get("diningForm");
			AccountContribution accountContribution = rewardNetwork.calculateContributionFor(diningForm.createDining());
			ctx.getFlowScope().put("accountContribution", accountContribution);
			return success();
		}
		catch(InvalidCreditCardException icx){
			ctx.getMessageContext().addMessage(new MessageBuilder().error().source("creditCardNumber").defaultText("ABC123").build());
			return error(icx);
		} catch (RewardNetworkException e) {
			e.printStackTrace();
			return error(e);
		}
	}
}
