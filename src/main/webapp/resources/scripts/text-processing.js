// Обработчик нажатия на ссылку
$(function() {
    $('.descriptors-list__link').on('click', function(event) {
        $('.token').addClass('descriptors-hidden');
        $(event.currentTarget).closest('.token').toggleClass('descriptors-hidden');
    });
});