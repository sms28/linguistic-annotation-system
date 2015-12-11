// Обработчик нажатия на ссылку
$(function() {
    $('.descriptors-list__link').on('click', function(event) {
        var opened = true;
        if ($(event.currentTarget).closest('.token').hasClass('descriptors-hidden')) {
            opened = false;
        }
        $('.token').addClass('descriptors-hidden');
        if (!opened) {
            $(event.currentTarget).closest('.token').removeClass('descriptors-hidden');
        }
    });
});