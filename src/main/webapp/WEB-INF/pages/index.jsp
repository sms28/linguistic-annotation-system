<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<html>
    <head>
        <link href='https://fonts.googleapis.com/css?family=Righteous&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" type="text/css" href="/resources/styles/main.css"/>

        <script src="../../resources/libs/jquery.js" defer></script>
    </head>
    <body>
        <header class="header">
            <h2 class="header__subtitle"></h2>
            <h1 class="header__title">Linguistic annotation system</h1>
        </header>
        <div class="navigation">
            <button class="navigation__button navigation__button_purple">HELP</button>
        </div>
        <div class="content">
            <div class="university-title">
                <p>Московский государственный университет имени М.В.Ломоносова</p>
                <p>Факультет вычислительной математики и кибернетики</p>
                <p>Кафедра алгоритмических языков</p>
            </div>
            <div class="content__form">
                Введите текст:
                <form name="inputText" method="post" action="/text-processing.html">
                    <textarea name="inputText" cols="80" rows="20"></textarea>
                    <select name="annotationType" required size="2">
                        <option value="grafan" selected>GrafAn</option>
                        <option value="mystem">Mystem</option>
                    </select>
                    <input type="submit">
                </form>
            </div>
        </div>
        <footer>

        </footer>
    </body>
</html>