//Сохранение файла на компьютер пользователя
$(function() {
    $('.processing-page__button-save').on('click', function() {


        //Создание JSON-объекта с данными

        var text = {
            tokens: []
        };

        $('.token').each(function() {
            var token = {};
            token.lemma = $(this).find('.lemma').text();
            token.begin = $(this).find('.begin').text();
            token.length = $(this).find('.length').text();
            token.descriptors = [];
            $(this).find('.descriptors-list__content').find(':checked').each(
                function() {
                    token.descriptors.push($(this).attr("name"));
                }
            );
            text.tokens.push(token);
        });


        //Передача данных на сервер

        $.ajax({
            type: 'POST',
            url: '/result-save.html',
            data: JSON.stringify(text),
            contentType: 'application/json; charset=utf-8',
            accept: 'text/plain',
            dataType: 'text',
            success: function(result) {
                $("#download-link").css("display", "inline-block");
            },
            error: function() {
                alert("Sorry, this is error message");
            }
        });


    });
});



