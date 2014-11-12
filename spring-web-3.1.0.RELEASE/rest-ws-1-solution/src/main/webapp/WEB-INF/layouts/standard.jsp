<%@ page session="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>
		<fmt:message>
			<tiles:insertAttribute name="title" />
		</fmt:message>
	</title>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>

	<link type="text/css" href="<c:url value="/styles/springsource.css"/>"/>
	<script>
/**
 * Send a synchronous HttpRequest and display resulting JSON in a popup window.
 * Intended for testing only.
 */
function getAsJson(url) {
	$.ajax({
	 	url : url,
	 	type : 'GET',
	 	datatype : 'json',
	 	async: false,
	 	success : function(data, textStatus, jqXHR) { 
	 		var jsonText = jqXHR.responseText.replace(/,/g, ",<br/>");
	 		jsonText = jsonText.replace(/\[/g,"<ul>[");
	 		jsonText = jsonText.replace(/\]/g,"]</ul>");

	 		var popup=window.open('','JSON Data','height=' + ($(window).height() / 1.6) +
	 				',width=' + ($(window).width() / 2.5) + ',alwaysRaised=yes,scrollbars=yes');
	 		popup.document.write("<html><body><p>" + jsonText + "</p></body></htnl>");
	 		popup.focus();
	 	},
	 	error : function() { alert('Failed!'); },
	 	beforeSend : function setHeader(xhr) { xhr.setRequestHeader('Accept', 'application/json'); }
	});
}
	</script>
</head>

<body id="body">

	<div id="page">
		<div id="header" class="clearfix">
			<div id="branding">
				<img src="<c:url value="/images/springsource_banner_green.png"/>" />
			</div>
		</div>
		<div id="content" class="clearfix">
			<div id="main">
				<tiles:insertAttribute name="main" />
			</div>
			<div id="nav">
				<tiles:importAttribute name="navigationTab" />
				<ul class="clearfix">
					<c:if test="${navigationTab != 'home'}">
						<li><a href="<c:url value="/"/>"> <fmt:message
									key="navigate.home" />
						</a></li>
					</c:if>
					<c:if test="${navigationTab != 'accounts'}">
						<spring:url var="listUrl" value="/accounts"/>

						<li><a href="${listUrl}"><fmt:message key="navigate.accounts" /></a>
						or as
						<a href="javascript:getAsJson('${listUrl}')">JSON</a> format data</li>
					</c:if>
					<c:if test="${navigationTab != 'search'}">
						<li><a href="<c:url value="/accounts/search"/>"> <fmt:message
									key="navigate.search" />
						</a></li>
					</c:if>
				</ul>
			</div>
		</div>
		<div id="footer" class="clearfix">
			<p>
				<fmt:message key="footer.message" />
			</p>
		</div>
	</div>
</body>
</html>