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
	$('#searchButton').bind('click', validate);
});

function test(){
	alert('Hello');
	return false;
}

function validate(){
	

	var searchString = $("#searchString").val();
	var maxResults = $("#maximumResults").val();
	
	alert($("#searchString").val());
}


</script>

<!-- TODO01: Define a JavaScript block to perform JQuery operations.  -->
<!-- TODO02: Define an initialization method to hide results table and initialize. -->
<!-- TODO03: Add a step to initialization to intercept submit and route to JavaScript function -->
<!-- TODO04: Add a JavaScript function to handle the submit process, extract form values and route
             to a REST handler method on the AccountSearchController -->
