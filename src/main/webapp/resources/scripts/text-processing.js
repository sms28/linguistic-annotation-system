$(function() {
    // Обработчик нажатия на "На главную"
    $('.processing-page__button-index').on('click', function() {

        var result = confirm("Вы действительно хотите покинуть страницу без сохранения?");

        if (result) {
            document.location.href = "/";
        }

    });

    // Обработчик нажатия на слово

});