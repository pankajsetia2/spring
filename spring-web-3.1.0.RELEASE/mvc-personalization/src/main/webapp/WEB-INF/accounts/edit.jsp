<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<h1>
	<fmt:message key="accounts.edit.title" />
</h1>

<div id="accountDetails">
	<spring:url value="/accounts/{number}" var="accountUrl">
		<spring:param name="number" value="${account.number}" />
	</spring:url> 
	<form:form modelAttribute="account" action="${accountUrl}" method="PUT">
		<fieldset>
			<legend>
				<fmt:message key="accounts.edit.legend"/>
			</legend>
			<ul>
				<li>
					<label for="name">
						<fmt:message key="label.Account.name"/>
					</label>
					<div class="control">
						<form:input path="name" />
						<form:errors cssClass="error" path="name" />
					</div>
				</li>
				<li>
					<label for="dateOfBirth">
						<fmt:message key="label.Account.dateOfBirth" />
					</label>
					<div class="control">
						<form:input path="dateOfBirth" />
						<form:errors cssClass="error" path="dateOfBirth" />
					</div>
				</li>
				<li>
					<label for="email">
						<fmt:message key="label.Account.email" />
					</label>
					<div class="control">
						<form:input path="email" />
						<form:errors cssClass="error" path="email" />
					</div>
				</li>
				<li class="confirm">
					<label for="receiveNewsletter">
						<form:checkbox path="receiveNewsletter" />
						<fmt:message key="label.Account.receiveNewsletter" />
					</label>
				</li>
				<li class="confirm">
					<label for="receiveMonthlyEmailUpdate">
						<form:checkbox path="receiveMonthlyEmailUpdate" />
						<fmt:message key="label.Account.receiveMonthlyEmailUpdate" />
					</label>
				</li>
			</ul>

			<button id="saveButton" type="submit">
				<fmt:message key="command.save" />
			</button>

			<a href="${accountUrl}">
				<fmt:message key="command.cancel" />
			</a>

		</fieldset>
	</form:form>
</div>