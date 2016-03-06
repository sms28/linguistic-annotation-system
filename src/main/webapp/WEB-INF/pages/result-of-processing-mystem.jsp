<%@ page contentType="text/html; charset=utf-8" language="java" %>
<%@ page import="las.service.Mystem.DescriptionList" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="las.service.Mystem.Lemma" %>
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
        <% ArrayList<DescriptionList> tokens = (ArrayList<DescriptionList>) request.getAttribute("tokens"); %>
        <% HashMap<String, String> descriptors = (HashMap) request.getAttribute("descriptors"); %>
        <table>
            <thead>
            <tr>
                <th>Графематическая единица</th>
                <th>Дескрипторы</th>
            </tr>
            </thead>
            <tbody>
            <% for (int i = 0; i < tokens.size(); ++i) { %>
            <tr class="token descriptors-hidden">
                <td class="lemma"><%= tokens.get(i).word %>
                </td>
                <td><a href="#" class="descriptors-list__link">Дескрипторы...</a></td>
                <td class="descriptors-list">
                    <div class="descriptors-list__content">
                        <% for (Lemma lemma : tokens.get(i).lemmas) { %>
                            <span>Лемма: <span style="font-weight: 700;"><%= lemma.lemma %></span>
                            <br>Грамеммы:
                              <% for (String prop : lemma.properties) { %>
                                <% if (descriptors.containsKey(prop)) { %>
                                  <%=descriptors.get(prop) %><br>
                                <% } else { System.out.println(prop);%>
                                  <%=prop %><br>
                                <% } %>
                              <% } %>
                            </span>
                        <input type="checkbox" name="<%= lemma.lemma %>" prop="<%= lemma.xmlString %>" checked>
                        <br>
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