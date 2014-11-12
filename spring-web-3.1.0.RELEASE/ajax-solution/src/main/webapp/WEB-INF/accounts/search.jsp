<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<h1>
	<fmt:message key="accounts.newSearch.title" />
</h1>

<c:url value="/accounts" var="accountsUrl"/>
<form:form id="accountSearchForm" action="${accountsUrl}" modelAttribute="accountSearchCriteria" method="get">
	<fieldset>
		<legend>
			<fmt:message key="label.AccountSearchCriteria"/>
		</legend>
		<ul>
			<li>
				<label>
					<fmt:message key="label.AccountSearchCriteria.searchString"/>
				</label>
				<div class="control">
					<form:input path="searchString"/>
					<form:errors cssClass="error" path="searchString"/>
				</div>
			</li>
			<li>
				<label>
					<fmt:message key="label.AccountSearchCriteria.maximumResults"/>
				</label>
				<div class="control">
					<form:select path="maximumResults">
						<form:option label="5" value="5"/>
						<form:option label="10" value="10"/>
						<form:option label="15" value="15"/>
					</form:select>
				</div>
			</li>
		</ul>
		<button id="searchButton" type="submit">
			<fmt:message key="command.search"/>
		</button>
	</fieldset>
</form:form>
<div id="accountsListingFragment">
	<table>
		<thead>
			<tr>
				<td><fmt:message key="label.Account.number"/></td>
				<td><fmt:message key="label.Account.name"/></td>
			</tr>
		</thead>
		<tbody id="resultTable">
		</tbody>
	</table>
</div>

<script type="text/javascript">
$(function() {
	$("#accountsListingFragment").hide();
	$("#searchButton").bind('click', processAjaxSubmit);
});

function processAjaxSubmit(event) {
	var searchString = $("#searchString").val();
	var maxResults = $("#maximumResults").val();
	if (searchString.length == 0) {
		$("#searchString").focus();
	} else {
		var params = {
			searchString : searchString,
			maximumResults : maxResults
		}
		$.getJSON("ajax", params, displayResults);
		
	}
	return false;
}

function displayResults(results) {
	if (results.length == 0) {
		alert("No results for search");
	} else {
		$("#resultTable").empty();
		for (var i=0;i<results.length;i++) {
		   // First pass: $("#resultTable").append('<tr><td>' + results[i].number + '</td><td>' + results[i].name + '</td></tr>');	
		   $("#resultTable").append('<tr><td><a href="#" onclick="processAjaxAccountDetails(' + results[i].number + ')" >' + results[i].number + '</a></td><td>' + results[i].name + '</td></tr>');	
		}
		$("#accountsListingFragment").fadeIn('fast');
	}
}

function processAjaxAccountDetails(data) {
	$.getJSON(data, function(results) {
		var account = results.account;
		var s = "=== Account Details ===\n\n";
		s += "Account Number: " + account.number + "\n";
		s += "Account Name: " + account.name + "\n";
		s += "Date of birth: " + account.dateOfBirth + "\n";
		s += "Receive newsletter? " + account.receiveNewsletter + "\n";
		alert(s);	
	} );
}

</script>