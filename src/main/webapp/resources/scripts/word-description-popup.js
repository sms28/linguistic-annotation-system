$(function() {

    var classes = {
        word: "descriptors__word",
        popupActive: "word-description_active",
        popupLemma: "word-description__popup-title-lemma",
        grafanBlock: "word-description__grafan",
        grafanItem: "word-description__grafan-item",
        mystemBlock: "word-description__mystem",
        mystemLemmaBlock: "word-description__mystem-lemma-block",
        menuItem: "word-description__menu-item",
        menuItemActive: "word-description__menu-item_active",
        deleteGrafanButton: "word-description__grafan-delete",
        deleteMystemButton: "word-description__mystem-delete",
        addGrafanButton: "word-description__grafan-add",
        closeButton: "word-description__popup-close"
    };

    var id = {
        popup: "word-popup",
        grafanTerms: "grafan-terms",
        mystemTerms: "mystem-terms"
    };


    var $word,
        $grafanTerms,
        $mystemTerms,
        $popup,
        $popupLemma,
        $grafanBlock,
        $mystemBlock,
        $menuItem,
        $grafanDeleteButton,
        $mystemDeleteButton,
        $addGrafanButton,
        $currentWord,
        $closeButton;


    function initVars() {
        $word = $("." + classes.word);
        $grafanTerms = $("#" + id.grafanTerms);
        $mystemTerms = $("#" + id.mystemTerms);
        $popup = $("#" + id.popup);
        $popupLemma = $popup.find("." + classes.popupLemma);
        $grafanBlock = $popup.find("." + classes.grafanBlock);
        $mystemBlock = $popup.find("." + classes.mystemBlock);
        $closeButton = $popup.find("." + classes.closeButton);
        $menuItem = $popup.find("." + classes.menuItem);
    }


    function grafanItemMarkup(descriptor) {
        return '<div class="word-description__grafan-item" descriptor="' + descriptor + '">' +
            '<div class="word-description__grafan-item-title">' +
            $grafanTerms.find("#" + descriptor.replace("?", "")).html() + // Название дескриптора на русском
            '</div>' +
            '<div class="word-description__grafan-delete word-description__link">удалить</div>' +
            '</div>';
    }


    function grafanMarkup(descriptors) {
        var begin = 0,
            end = descriptors.indexOf(","),
            resultMarkup = '<div class="word-description__grafan-title">Характеристики слова:</div>';

        while (end != -1) {
            resultMarkup += grafanItemMarkup(descriptors.substring(begin, end));
            begin = end + 1;
            end = descriptors.indexOf(",", begin);
        }

        if (begin < descriptors.length) {
            resultMarkup += grafanItemMarkup(descriptors.substring(begin, descriptors.length));
        }

        resultMarkup += '<div class="word-description__grafan-add word-description__link">Добавить новый дескриптор</div>';

        return resultMarkup;
    }


    function mystemItemMarkup(descriptor) {
        return '<div class="word-description__mystem-item">' +
                '<div class="word-description__mystem-item-title">' +
                $mystemTerms.find("#" + descriptor).html() + // Название дескриптора на русском
                '</div>' +
                '</div>';
    }


    function mystemMarkup(descriptors) {
        var lemmaBegin = 0,
            lemmaEnd = descriptors.indexOf("|"),
            resultMarkup = '<div class="word-description__mystem-title">Морфологические группы:</div>';

        while (lemmaEnd != -1) {
            var lemmaBlock = descriptors.substring(lemmaBegin, lemmaEnd),
                lemmaIndex = lemmaBlock.indexOf(":"),
                lemma = lemmaBlock.substring(0, lemmaIndex),
                lemmaDescriptors = lemmaBlock.substring(lemmaIndex + 1, lemmaBlock.length);

            resultMarkup += '<div class="word-description__mystem-lemma-block" descriptors="'+ lemmaBlock +'">' +
                            '<div class="word-description__mystem-lemma">Лемма: ' +
                            '<span class="word-description__mystem-lemma-text">' + lemma + '</span>' +
                            '</div>' +
                            '<div class="word-description__mystem-delete word-description__link">удалить группу</div>';

            var begin = 0,
                end = lemmaDescriptors.indexOf(",");
            while(end != -1) {
                resultMarkup += mystemItemMarkup(lemmaDescriptors.substring(begin, end));
                begin = end + 1;
                end = lemmaDescriptors.indexOf(",", begin);
            }
            if (begin < lemmaDescriptors.length) {
                resultMarkup += mystemItemMarkup(lemmaDescriptors.substring(begin, lemmaDescriptors.length));
            }

            resultMarkup += '</div>';

            lemmaBegin = lemmaEnd + 1;
            lemmaEnd = descriptors.indexOf("|", lemmaBegin);
        }

        resultMarkup += '<div class="word-description__mystem-add word-description__link">Добавить новую группу</div>';

        return resultMarkup;
    }


    function showPopup() {
        var $this = $(this);

        $currentWord = $this;

        $popupLemma.html($this.html());

        $grafanBlock.html(grafanMarkup($this.attr("grafan")));

        $mystemBlock.html(mystemMarkup($this.attr("mystem")));

        $popup.addClass(classes.popupActive);

        $grafanDeleteButton = $popup.find("." + classes.deleteGrafanButton);

        $grafanDeleteButton.on("click", deleteGrafanDescriptor);

        $addGrafanButton = $popup.find("." + classes.addGrafanButton);

        $addGrafanButton.on("click", showAdditionalDescriptorsPopup);

        $mystemDeleteButton = $popup.find("." + classes.deleteMystemButton);

        $mystemDeleteButton.on("click", deleteMystemDescriptor);

    }

    function showAdditionalDescriptorsPopup() {
        //TODO
    }

    function closePopup() {
        $popup.removeClass(classes.popupActive);
    }

    function menuItemClickHandler() {
        var $this = $(this);

        if (!$this.hasClass(classes.menuItemActive)) {
            $menuItem.removeClass(classes.menuItemActive);
            $this.addClass(classes.menuItemActive);
            $popup.attr("activeblock", $this.attr("type"));
        }
    }


    function deleteGrafanDescriptor() {
        var $this = $(this),
            grafanItem = $this.closest("." + classes.grafanItem),
            deletedDescriptor = grafanItem.attr("descriptor"),
            oldDescriptors = $currentWord.attr("grafan"),
            newDescriptors = oldDescriptors.replace(deletedDescriptor + ",", "").replace(deletedDescriptor, "");

        $currentWord.attr("grafan", newDescriptors);

        grafanItem.remove();
    }


    function deleteMystemDescriptor() {
        var $this = $(this),
            lemmaBlock = $this.closest("." + classes.mystemLemmaBlock),
            deletedDescriptor = lemmaBlock.attr("descriptors"),
            oldDescriptors = $currentWord.attr("mystem"),
            newDescriptors = oldDescriptors.replace(deletedDescriptor + "|", "");

        $currentWord.attr("mystem", newDescriptors);

        lemmaBlock.remove();
    }

    function bindEvents() {
        $word.on("click", showPopup);
        $menuItem.on("click", menuItemClickHandler);
        $closeButton.on("click", closePopup);
    }

    function init() {
        initVars();
        bindEvents();
    }



    init();

});