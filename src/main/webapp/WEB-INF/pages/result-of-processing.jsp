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
    <script src="../../resources/scripts/word-description-popup.js" defer></script>
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


        <!-- Названия дескрипторов в скрытых блоках. ВНИМАНИЕ! ID дескриптора - его название без вопросительных знаков
        (вместо вопросительных знаков "Q") -->

        <div class="descriptors__grafan-terms" id="grafan-terms" style="display:none">
            <% for (String key : grafanDescriptors.keySet()) { %>
                <p id="<%=key.replace("?", "Q")%>" eng="<%=grafanDescriptors.get(key).eng%>"><%=grafanDescriptors.get(key).rus%></p>
            <% } %>
        </div>

        <div class="descriptors__mystem-terms" id="mystem-terms" style="display:none">
            <% for (String key : mystemDescriptors.keySet()) { %>
            <p id="<%=key%>" eng="<%=mystemDescriptors.get(key).eng%>"><%=mystemDescriptors.get(key).rus%></p>
            <% } %>
        </div>

        <% for (Integer key : tokens.text.keySet()) { %>

            <span class="descriptors__word" id="<%=key%>"
                grafan="<%=tokens.text.get(key).grafematicData.toString().replace("[", "").replace("]", "").replace(", ", "|").replace("?", "Q") + "|"%>"
                mystem="<%
                    String mystem = "";
                    for(MystemLemma lemma: tokens.text.get(key).morphologicalData) {
                        mystem += lemma.lemma + ":";
                        mystem += lemma.properties.toString().replace("[", "").replace("]", "").replace(", ", ",") + ",|";
                    }%><%=mystem%>"><%=tokens.text.get(key).word%></span>
        <% } %>
    </div>




    <!-- Popup с характеристиками слова -->

    <div class="word-description" id="word-popup" activeblock="grafan">
        <div class="word-description__wrap">
            <div class="word-description__popup">
                <div class="word-description__popup-title">
                    <span class="word-description__popup-title-word">Слово: </span>
                    <span class="word-description__popup-title-lemma">Лемма</span>
                    <div class="word-description__popup-close"></div>
                </div>
                <div class="word-description__popup-content">
                    <div class="word-description__menu">
                        <div class="word-description__menu-item word-description__menu-item_active" type="grafan">Графематическая разметка</div>
                        <div class="word-description__menu-item" type="mystem">Морфологическая разметка</div>
                    </div>
                    <div class="word-description__content">
                        <div class="word-description__grafan"></div>
                        <div class="word-description__mystem"></div>
                    </div>
                </div>
            </div>

            <div class="additional-descriptors-popup">
                <div class="additional-descriptors-popup__title">
                    <span class="additional-descriptors-popup__title-word"></span>
                    <div class="additional-descriptors-popup__close"></div>
                </div>
                <div class="additional-descriptors-popup__content"></div>
                <div class="additional-descriptors-popup__bottom">
                    <button class="additional-descriptors-popup__button additional-descriptors-popup__button_save">Сохранить</button>
                    <button class="additional-descriptors-popup__button additional-descriptors-popup__button_cancel">Отменить</button>
                </div>
            </div>
        </div>
    </div>

</div>
</body>
</html>