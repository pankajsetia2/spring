<%@ page session="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>
		<fmt:message key="welcome.title" />
	</title>
</head>
<body>
<div id="page">
	<div id="header" class="clearfix">
		<div id="branding">
			<img src="<c:url value="/images/springsource_banner_green.png"/>" />
		</div>
	</div>
	<div id="content" class="clearfix">
		<div id="main">
			<h1>
				<fmt:message key="welcome.title" />
			</h1>
			<h2>
				<fmt:message key="welcome.caption" />
			</h2>
		</div>
		<div id="nav">
			<ul class="controlLinks">
				<li>
					<a href="<c:url value="/admin/accounts"/>">
						<fmt:message key="navigate.accounts" />
					</a>
				</li>
			</ul>		
		</div>		
	</div>
	<div id="footer" class="clearfix">
		<p><fmt:message key="footer.message"/></p>
	</div>
</div>
</body>
</html>