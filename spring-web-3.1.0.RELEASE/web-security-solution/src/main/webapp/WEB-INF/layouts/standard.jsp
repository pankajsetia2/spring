<%@ page session="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>

<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>
		<fmt:message>
			<tiles:insertAttribute name="title"/>
		</fmt:message>
	</title>
</head>
<body class="tundra">
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
					<li>
						<c:if test="${navigationTab eq 'home'}">
							<strong>
								<a href="<c:url value="/"/>">
									<fmt:message key="navigate.home"/>
								</a>
							</strong>
						</c:if>
						<c:if test="${navigationTab != 'home'}">
							<a href="<c:url value="/"/>">
								<fmt:message key="navigate.home"/>
							</a>
						</c:if>
					</li>
					<li>
						<c:if test="${navigationTab eq 'accounts'}">
							<strong>
								<a href="<c:url value="/accounts/search"/>">
									<fmt:message key="navigate.accounts"/>
								</a>
							</strong>
						</c:if>
						<c:if test="${navigationTab != 'accounts'}">
							<a href="<c:url value="/accounts/search"/>">
								<fmt:message key="navigate.accounts"/>
							</a>
						</c:if>
					</li>
                    <security:authorize access="hasRole('ROLE_ADMIN')">
					<li>
						<c:if test="${navigationTab eq 'newReward'}">
							<strong>
								<a href="<c:url value="/rewards/newReward"/>">
									<fmt:message key="navigate.rewards"/>
								</a>
							</strong>
						</c:if>
						<c:if test="${navigationTab != 'newReward'}">
							<a href="<c:url value="/rewards/newReward"/>">
								<fmt:message key="navigate.rewards"/>
							</a>
						</c:if>						
					</li>
					</security:authorize>
                    <security:authorize access="isAuthenticated()">
        	            <li>
	        	            <a href="<c:url value="/j_spring_security_logout"/>"><fmt:message key="navigate.logout"/></a>
    	                </li>
                    </security:authorize>
				</ul>
			</div>
		</div>
		<div id="footer" class="clearfix">
			<p><fmt:message key="footer.message"/></p>
		</div>
	</div>
</body>
</html>