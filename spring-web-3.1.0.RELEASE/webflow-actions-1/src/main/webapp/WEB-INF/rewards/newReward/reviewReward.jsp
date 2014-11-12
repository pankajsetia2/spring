<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<h1>
	<fmt:message key="reviewReward.title" />
</h1>

<form id="reviewReward" method="post">
	<fieldset>
		<legend>
			<fmt:message key="label.Reward" />
		</legend>
		<ul>
			<li>
				<label><fmt:message key="label.Reward.accountNumber" /></label> ${accountContribution.accountNumber}
			</li>
			<li>
				<label><fmt:message key="label.Reward.amount" /></label> ${accountContribution.amount}
			</li>
			<li>
				<label>
					<fmt:message key="label.Reward.accountContribution.distribution"/>
				</label>
				<table>
					<thead>
						<tr>
							<td><fmt:message key="label.Reward.accountContribution.distribution.beneficiary"/></td>
							<td><fmt:message key="label.Reward.accountContribution.distribution.amount"/></td>
							<td><fmt:message key="label.Reward.accountContribution.distribution.percentage"/></td>
							<td><fmt:message key="label.Reward.accountContribution.distribution.totalSavings"/></td>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${accountContribution.distributions}" var="distribution">
							<tr>
								<td>${distribution.beneficiary}</td>
								<td>${distribution.amount}</td>
								<td>${distribution.percentage}</td>
								<td>${distribution.totalSavings}</td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
			</li>
		</ul>
		
		<button type="submit" name="_eventId_confirm">
			<fmt:message key="command.confirm"/>
		</button>
		
	</fieldset>
</form>