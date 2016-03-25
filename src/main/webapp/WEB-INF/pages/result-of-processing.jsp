<%@ page contentType="text/html; charset=utf-8" language="java" %>
<%@ page import="las.service.Grafematic.GrafematicDescriptionList" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="las.service.EnglishRussianTitle" %>
<%@ page import="las.service.GrafematicMystemText" %>
<%@ page import="las.service.Mystem.MystemLemma" %>
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
        <% GrafematicMystemText tokens = (GrafematicMystemText) request.getAttribute("tokens"); %>
        <% HashMap<String, EnglishRussianTitle> grafanDescriptors = (HashMap) request.getAttribute("grafanDescriptors"); %>
        <% HashMap<String, EnglishRussianTitle> mystemDescriptors = (HashMap) request.getAttribute("mystemDescriptors"); %>

            <% for (Integer key : tokens.text.keySet()) { %>

                <p><%=tokens.text.get(key).word%></p>

                <p><%=tokens.text.get(key).grafematicData.toString()%></p>

                <% for(MystemLemma lemma: tokens.text.get(key).morphologicalData) { %>

                    <p><%=lemma.lemma%></p>
                    <p><%=lemma.properties.toString()%></p>
        <br>

                <% } %>
        <br>
            <% } %>

    </div>

</div>
</body>
</html>