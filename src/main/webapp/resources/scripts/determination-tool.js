//Определение инструмента аннотирования
$(function() {

    $('.content__button_grafan').on('click', function() {
        var text = $(this).parent().children('.content__textarea').eq(0).val();

        $.ajax({
            type: 'POST',
            url: '/text-processing.html',
            data: JSON.stringify(text),
            contentType: 'application/json; charset=utf-8',
            accept: 'text/plain',
            dataType: 'text'
        });

        //return false;
    });
});