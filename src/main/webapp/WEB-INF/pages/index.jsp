<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<html>
    <head>
        <link href='https://fonts.googleapis.com/css?family=Righteous&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" type="text/css" href="/resources/styles/main.css"/>

        <script src="../../resources/libs/jquery.js"></script>
        <script src="../../resources/libs/select2.full.min.js"></script>
        <script src="../../resources/scripts/select.js"></script>
    </head>
    <body>
        <header class="header">
            <h2 class="header__subtitle"></h2>
            <h1 class="header__title">Linguistic annotation system</h1>
        </header>
        <div class="navigation">
            <button class="navigation__button navigation__button_purple">помощь</button>
        </div>
        <div class="content">
            <div class="university-title">
                <p>Московский государственный университет имени М.В.Ломоносова</p>
                <p>Факультет вычислительной математики и кибернетики</p>
                <p>Кафедра алгоритмических языков</p>
            </div>
            <div class="content__form">
                <div class="content__subtitle">Введите текст:</div>
                <form name="inputText" method="post" action="/text-processing.html">
                    <textarea name="inputText" rows="15" class="content__textarea"></textarea>
                    <div class="content__subtitle">Выберите тип разметки:</div>
                    <select name="annotationType" class="content__select jsSelect">
                        <option value="hand" selected>Разметка вручную</option>
                        <option value="grafan">Графематическая разметка</option>
                        <option value="mystem">Морфологическая разметка</option>
                        <option value="grafan&mystem">Графематическая и морфологическая разметки</option>
                        <option value="grafan&term">Графематическая и терминологическая разметки</option>
                        <option value="grafan&term&mystem">Графематическая, терминологическая и морфологическая разметки</option>
                    </select>
                    <br>
                    <input type="submit" class="content__submit" value="начать разметку">
                </form>
            </div>
        </div>
        <footer>

        </footer>
    </body>
</html>