<%@ page contentType="text/html;" language="java" %>
<html>
    <head>
        <link href='https://fonts.googleapis.com/css?family=Righteous&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" type="text/css" href="/resources/styles/index.css"/>
        <link rel="stylesheet" type="text/css" href="/resources/styles/reset.css"/>
    </head>
    <body>
        <header class="header">
            <h1 class="header__title">Linguistic annotation system</h1>
        </header>
        <content>
            <form name="inputText" method="post" action="/text-processing.html">
                <textarea name="inputText" cols="80" rows="20"></textarea>
                <input type="submit">
            </form>
        </content>
        <footer>

        </footer>
    </body>
</html>