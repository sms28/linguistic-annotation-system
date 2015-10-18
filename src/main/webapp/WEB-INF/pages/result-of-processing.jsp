<%@ page contentType="text/html;" language="java" %>
<%@ page import="las.service.Grafematic.DescriptionList" %>
<%@ page import="java.util.ArrayList" %>
<html>
<body>
    <%--<p><%= (String)request.getAttribute("parsedText") %></p>--%>
    <% ArrayList<DescriptionList> tokens = (ArrayList)request.getAttribute("parsedText"); %>
    <table>
        <thead>
            <tr>
                <th>Token</th>
                <th>Begin</th>
                <th>Length</th>
                <th>Properties</th>
            </tr>
        </thead>
        <tbody>
            <% for(int i = 0; i < tokens.size(); ++i) { %>
                <tr>
                    <td><%= tokens.get(i).word %></td>
                    <td><%= tokens.get(i).begin %></td>
                    <td><%= tokens.get(i).length %></td>
                    <td><%= tokens.get(i).properties.toString() %></td>
                </tr>
            <%} %>
        </tbody>
    </table>
</body>
</html>