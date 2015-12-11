<%@ page contentType="text/html; charset=utf-8" language="java" %>
<%@ page import="las.service.Grafematic.DescriptionList" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.HashMap" %>
<html>
<head>
    <link rel="stylesheet" href="../../resources/styles/main.css"/>
    <script src="../../resources/libs/jquery.js" defer></script>
    <script src="../../resources/scripts/text-processing.js" defer></script>
    <script src="../../resources/scripts/result-save.js" defer></script>
</head>
<body>
<div class="processing-page">

    <div class="navigation">
        <button class="navigation__button processing-page__button-save navigation__button_purple">
            Сохранить
        </button>
        <button class="navigation__button processing-page__button-index navigation__button_pink">
            На главную
        </button>
        <a id="download-link" href="/download" class="processing-page__link">Cкачать файл</a>
    </div>

    <div class="descriptors">
        <% ArrayList<DescriptionList> tokens = (ArrayList) request.getAttribute("tokens"); %>
        <% HashMap<String, String> descriptors = (HashMap) request.getAttribute("descriptors"); %>
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
            <% for (int i = 0; i < tokens.size(); ++i) { %>
            <tr class="token descriptors-hidden">
                <td class="lemma"><%= tokens.get(i).word %>
                </td>
                <td class="begin"><%= tokens.get(i).begin %>
                </td>
                <td class="length"><%= tokens.get(i).length %>
                </td>
                <td><a href="#" class="descriptors-list__link">Дескрипторы...</a></td>
                <td class="descriptors-list">
                    <div class="descriptors-list__content">
                        <% for (String key : descriptors.keySet()) { %>
                            <% if (tokens.get(i).properties.contains(key)) { %>
                                <span><%= descriptors.get(key) %></span>
                                <input type="checkbox" name="<%=key%>" checked>
                                <br>
                            <% } %>
                        <% } %>
                        <% for (String key : descriptors.keySet()) { %>
                            <% if (!tokens.get(i).properties.contains(key)) { %>
                                <span><%= descriptors.get(key) %></span>
                                <input type="checkbox" name="<%=key%>">
                                <br>
                            <% } %>
                        <% } %>
                    </div>
                </td>
            </tr>
            <% } %>
            </tbody>
        </table>
    </div>

</div>
</body>
</html>