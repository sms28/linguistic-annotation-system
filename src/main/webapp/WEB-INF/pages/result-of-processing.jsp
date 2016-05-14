<%@ page contentType="text/html; charset=utf-8" language="java" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="las.service.EnglishRussianTitle" %>
<%@ page import="las.service.TextCharacteristics" %>
<%@ page import="las.service.Mystem.MystemLemma" %>
<html>
<head>
    <link rel="stylesheet" href="../../resources/styles/main.css"/>
</head>
<body>
<div class="processing-page">

        <div class="navigation">
            <button class="navigation__button processing-page__button-save">
                Сохранить
            </button>
            <button class="navigation__button processing-page__button-index">
                На главную
            </button>
            <a id="download-link" href="/download" class="processing-page__link">Cкачать файл</a>
            <div class="navigation__fix-names-button">Изменить значения аннотаций</div>
        </div>

        <div class="descriptors">
            <% TextCharacteristics tokens = (TextCharacteristics) request.getAttribute("tokens"); %>
            <% HashMap<String, EnglishRussianTitle> grafanDescriptors = (HashMap) request.getAttribute("grafanDescriptors"); %>
            <% HashMap<String, EnglishRussianTitle> mystemDescriptors = (HashMap) request.getAttribute("mystemDescriptors"); %>


            <!-- Названия дескрипторов в скрытых блоках. ВНИМАНИЕ! ID дескриптора - его название без вопросительных знаков
            (вместо вопросительных знаков "Q") -->

            <div class="descriptors__grafan-terms" id="grafan-terms" style="display:none">
                <% for (String key : grafanDescriptors.keySet()) { %>
                <p id="<%=key.replace("?", "Q")%>" eng="<%=grafanDescriptors.get(key).eng%>" class="descriptors__grafan-terms-item"><%=grafanDescriptors.get(key).rus%></p>
                <% } %>
            </div>

            <div class="descriptors__mystem-terms" id="mystem-terms" style="display:none">
                <% for (String key : mystemDescriptors.keySet()) { %>
                <p id="<%=key%>" eng="<%=mystemDescriptors.get(key).eng%>" class="descriptors__mystem-terms-item"><%=mystemDescriptors.get(key).rus%></p>
                <% } %>
            </div>

            <div class="descriptors__hint">Нажмите на токен, чтобы увидеть его характеристики</div>

            <% for (Integer key : tokens.text.keySet()) { %>

            <span class="descriptors__word" id="<%=key%>"
                  grafan="<%=tokens.text.get(key).grafematicData.toString()
                        .replace("[", "")
                        .replace("]", "")
                        .replace(", ", "|")
                        .replace("?", "Q") + "|"%>"
                  mystem="<%
                    String mystem = "";
                    for(MystemLemma lemma: tokens.text.get(key).morphologicalData) {
                        mystem += lemma.lemma + ":";
                        mystem += lemma.properties.toString()
                        .replace(" ", "")
                        .replace("[", "")
                        .replace(",]", "")
                        .replace("]", "")
                        + ",|";
                    }%><%=mystem%>"
                    <%
                        String termCharacteristic = "";
                        for (String termDescriptor : tokens.text.get(key).termData) {
                            if (termDescriptor.equals("TERM_BEGIN")) {
                                termCharacteristic += "term-begin";
                            }
                            if (termDescriptor.equals("TERM_END")) {
                                termCharacteristic += " term-end";
                            }
                        }
                    %><%=termCharacteristic%>

                    ><%=tokens.text.get(key).word%>

            </span>

            <% } %>
        </div>




        <!-- Popup с характеристиками слова -->

        <div class="word-description" id="word-popup" activeblock="grafan">
            <div class="word-description__wrap">
                <div class="word-description__popup">
                    <div class="word-description__popup-title">
                        <span class="word-description__popup-title-word">Токен: </span>
                        <span class="word-description__popup-title-lemma"></span>
                        <div class="word-description__popup-close"></div>
                    </div>
                    <div class="word-description__popup-content">
                        <div class="word-description__menu">
                            <div class="word-description__menu-item word-description__menu-item_active" type="grafan">Графематическая разметка</div>
                            <div class="word-description__menu-item" type="mystem">Морфологическая разметка</div>
                            <div class="word-description__menu-item" type="term">Терминологическая разметка</div>
                        </div>
                        <div class="word-description__content">
                            <div class="word-description__grafan"></div>
                            <div class="word-description__mystem"></div>
                            <div class="word-description__term"></div>
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






        <%--Popup с названиями дескрипторов--%>
        <div class="description-names" id="names-popup" activeblock="grafan">
            <div class="description-names__wrap">
                <div class="description-names__popup">
                    <div class="description-names__popup-title">
                        <span class="description-names__popup-title-word">Значения аннотаций</span>
                        <div class="description-names__popup-close jsPopupClose"></div>
                    </div>
                    <div class="description-names__popup-content">
                        <div class="description-names__menu">
                            <div class="description-names__menu-item description-names__menu-item_active" type="grafan">Графематическая разметка</div>
                            <div class="description-names__menu-item" type="mystem">Морфологическая разметка</div>
                        </div>
                        <div class="description-names__content">
                            <div class="description-names__grafan"></div>
                            <div class="description-names__mystem"></div>
                        </div>
                    </div>
                    <div class="description-names__bottom">
                        <button class="description-names__button description-names__button_save">Сохранить</button>
                        <button class="description-names__button description-names__button_cancel jsPopupClose">Отменить</button>
                    </div>
                </div>
            </div>
        </div>




    </div>


<script src="../../resources/libs/jquery.js" defer></script>
<script src="../../resources/scripts/text-processing.js" defer></script>
<script src="../../resources/scripts/result-save.js" defer></script>
<script src="../../resources/scripts/word-description-popup.js" defer></script>
<script src="../../resources/scripts/description-names.js" defer></script>


</body>
</html>