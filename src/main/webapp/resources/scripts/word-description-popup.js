$(function() {

    var classes = {
        word: "descriptors__word",
        popupActive: "word-description_active",
        popupLemma: "word-description__popup-title-lemma",
        grafanBlock: "word-description__grafan"
    };

    var id = {
        popup: "word-popup",
        grafanTerms: "grafan-terms"
    };


    var $word,
        $grafanTerms,
        $popup,
        $popupLemma,
        $grafanBlock;


    function initVars() {
        $word = $("." + classes.word);
        $grafanTerms = $("#" + id.grafanTerms);
        $popup = $("#" + id.popup);
        $popupLemma = $popup.find("." + classes.popupLemma);
        $grafanBlock = $popup.find("." + classes.grafanBlock);
    }


    function grafanMarkup(descriptors) {
        var begin = 0,
            end = descriptors.indexOf(","),
            resultMarkup = '<div class="word-description__grafan-title">Характеристики слова:</div>';

        while (end != -1) {
            resultMarkup +=
                '<div class="word-description__grafan-item">' +
                '<div class="word-description__grafan-item-title">' +
                $grafanTerms.find("#" + descriptors.substring(begin, end).replace("?", "")).html() + // Название дескриптора на русском
                '</div>' +
                '<div class="word-description__grafan-delete word-description__link">удалить</div>' +
                '</div>';

            begin = end + 1;
            end = descriptors.indexOf(",", begin);
        }

        if (begin < descriptors.length) {
            resultMarkup +=
                '<div class="word-description__grafan-item">' +
                '<div class="word-description__grafan-item-title">' +
                $grafanTerms.find("#" + descriptors.substring(begin, descriptors.length).replace("?", "")).html() + // Название дескриптора на русском
                '</div>' +
                '<div class="word-description__grafan-delete word-description__link">удалить</div>' +
                '</div>';
        }

        resultMarkup += '<div class="word-description__grafan-add word-description__link">Добавить новый дескриптор</div>';

        return resultMarkup;
    }


    function showPopup() {
        var $this = $(this);

        $popupLemma.html($this.html());

        $grafanBlock.html(grafanMarkup($this.attr("grafan")));

        $popup.addClass(classes.popupActive);
    }

    function bindEvents() {
        $word.on("click", showPopup);
    }

    function init() {
        initVars();
        bindEvents();
    }



    init();

});