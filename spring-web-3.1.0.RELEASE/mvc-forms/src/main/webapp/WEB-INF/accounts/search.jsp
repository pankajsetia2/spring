<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<h1>
	<fmt:message key="accounts.newSearch.title" />
</h1>

<c:url value="/accounts" var="accountsUrl"/>
<form action="${accountsUrl}" method="get">
	<fieldset>
		<legend>
			<fmt:message key="label.AccountSearchCriteria" />
		</legend>
		<ul>
			<li>
				<label>
					<fmt:message key="label.AccountSearchCriteria.searchString" />
				</label>
				<div class="control">
					<input type="text" name="searchString" />
				</div>
			</li>
			<li>
				<label>
					<fmt:message key="label.AccountSearchCriteria.maximumResults" />
				</label>
				<div class="control">
					<select name="maximumResults">
						<option>5</option>
						<option>10</option>
						<option>15</option>
					</select>
				</div>
			</li>
		</ul>	
		<button id="searchButton" type="submit">
			<fmt:message key="command.search" />
		</button>
	</fieldset>
</form>