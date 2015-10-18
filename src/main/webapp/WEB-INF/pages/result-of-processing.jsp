<%@ page contentType="text/html; charset=utf-8" language="java" %>
<%@ page import="las.service.Grafematic.DescriptionList" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.HashMap" %>
<html>
<head>
    <link rel="stylesheet" href="../../resources/styles/result-of-processing.css"/>
    <script src="../../resources/libs/jquery.js" defer></script>
    <script src="../../resources/scripts/text-processing.js" defer></script>
</head>
<body>
    <% ArrayList<DescriptionList> tokens = (ArrayList)request.getAttribute("tokens"); %>
    <% HashMap<String, String> descriptors = (HashMap)request.getAttribute("descriptors"); %>
    <table>
        <thead>
            <tr>
                <th>Графематическая единица</th>
                <th>Начальная позиция в тексте</th>
                <th>Длина</th>
                <th>Дескрипторы</th>
            </tr>
        </thead>
        <tbody>
            <% for(int i = 0; i < tokens.size(); ++i) { %>
                <tr class="token descriptors-hidden">
                    <td><%= tokens.get(i).word %></td>
                    <td><%= tokens.get(i).begin %></td>
                    <td><%= tokens.get(i).length %></td>
                    <td><a href="#" class="descriptors-list__link">Дескрипторы...</a></td>
                    <td class="descriptors-list">
                        <% for(String key: descriptors.keySet()) { %>
                            <span><%= descriptors.get(key) %></span>
                            <% if (tokens.get(i).properties.contains(key)) { %>
                                <input type="checkbox" name="<%=key%>" checked>
                            <% } else { %>
                                <input type="checkbox" name="<%=key%>">
                            <% } %>
                        <% } %>
                    </td>
                </tr>
            <% } %>
        </tbody>
    </table>
</body>
</html>