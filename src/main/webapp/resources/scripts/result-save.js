//Сохранение файла на компьютер пользователя
$(function() {
    $('.processing-page__button-save').on('click', function() {



        //Создание JSON-объекта с данными

        var text = {
            tokens: []
        };

        var token = {};
        $('.token').each(function() {
            token.lemma = $(this).find('.lemma').text();
            token.begin = $(this).find('.begin').text();
            token.length = $(this).find('.length').text();
            //token.descriptors = [];
            $(this).find('.descriptors-list__content').find(':checked').each(
                function() {
                    //token.descriptors.push($(this).attr("name"));
                }
            );
            text.tokens.push(token);
        });

        //Передача данных на сервер

        $.ajax({
            type: 'POST',
            url: '/result-save.html',
            //data: "meow="+encodeURI(token),
            data: text.tokens,
            //contentType: "application/json",
            //mimeType: "application/json",
            //dataType: 'json',
            //beforeSend: function(xhr) {
                //xhr.setRequestHeader("Accept", "application/json");
                //xhr.setRequestHeader("Content-Type", "application/json");
            //}
        });


    });
});



