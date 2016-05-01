$(function() {

    var classes = {
        word: "descriptors__word",
        popupActive: "word-description_active",
        popupLemma: "word-description__popup-title-lemma",
        termBlock: "word-description__term",
        termItem: "word-description__term-item",
        grafanBlock: "word-description__grafan",
        grafanItem: "word-description__grafan-item",
        mystemBlock: "word-description__mystem",
        mystemLemmaBlock: "word-description__mystem-lemma-block",
        menuItem: "word-description__menu-item",
        menuItemActive: "word-description__menu-item_active",
        deleteGrafanButton: "word-description__grafan-delete",
        deleteMystemButton: "word-description__mystem-delete",
        deleteTermButton: "word-description__term-delete",
        addGrafanButton: "word-description__grafan-add",
        addMystemButton: "word-description__mystem-add",
        addTermButton: "word-description__term-add",
        closeButton: "word-description__popup-close",
        additionalPopup: "additional-descriptors-popup",
        additionalPopupItem: "additional-descriptors-popup__item",
        additionalPopupTextInput: "additional-descriptors-popup__text-input",
        additionalPopupActive: "additional-descriptors-popup_active",
        additionalPopupClose: "additional-descriptors-popup__close",
        additionalPopupTitle: "additional-descriptors-popup__title-word",
        additionalPopupContent: "additional-descriptors-popup__content",
        additionalPopupSave: "additional-descriptors-popup__button_save",
        additionalPopupCancel: "additional-descriptors-popup__button_cancel"
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
        $termBlock,
        $grafanBlock,
        $mystemBlock,
        $menuItem,
        $grafanDeleteButton,
        $mystemDeleteButton,
        $termDeleteButton,
        $addGrafanButton,
        $addMystemButton,
        $addTermButton,
        $currentWord,
        $closeButton,
        $additionalPopup,
        $additionalPopupClose,
        $additionalPopupTitle,
        $additionalPopupSave,
        $additionalPopupCancel,
        $additionalPopupContent;


    function initVars() {
        $word = $("." + classes.word);
        $grafanTerms = $("#" + id.grafanTerms);
        $mystemTerms = $("#" + id.mystemTerms);
        $popup = $("#" + id.popup);
        $popupLemma = $popup.find("." + classes.popupLemma);
        $termBlock = $popup.find("." + classes.termBlock);
        $grafanBlock = $popup.find("." + classes.grafanBlock);
        $mystemBlock = $popup.find("." + classes.mystemBlock);
        $closeButton = $popup.find("." + classes.closeButton);
        $menuItem = $popup.find("." + classes.menuItem);
        $additionalPopup = $("." + classes.additionalPopup);
        $additionalPopupClose = $additionalPopup.find("." + classes.additionalPopupClose);
        $additionalPopupTitle = $additionalPopup.find("." + classes.additionalPopupTitle);
        $additionalPopupContent = $additionalPopup.find("." + classes.additionalPopupContent);
        $additionalPopupSave = $additionalPopup.find("." + classes.additionalPopupSave);
        $additionalPopupCancel = $additionalPopup.find("." + classes.additionalPopupCancel);
    }


    function grafanItemMarkup(descriptor) {
        return '<div class="word-description__grafan-item" descriptor="' + descriptor + '">' +
            '<div class="word-description__grafan-item-title">' +
            ($grafanTerms.find("#" + descriptor)).html() + // Название дескриптора на русском
            '</div>' +
            '<div class="word-description__grafan-delete word-description__link">удалить</div>' +
            '</div>';
    }


    function grafanMarkup(descriptors) {
        var begin = 0,
            end = descriptors.indexOf("|"),
            resultMarkup = '<div class="word-description__grafan-title">Характеристики слова:</div>';

        while (end != -1) {
            resultMarkup += grafanItemMarkup(descriptors.substring(begin, end));
            begin = end + 1;
            end = descriptors.indexOf("|", begin);
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

            resultMarkup += '</div>';

            lemmaBegin = lemmaEnd + 1;
            lemmaEnd = descriptors.indexOf("|", lemmaBegin);
        }

        resultMarkup += '<div class="word-description__mystem-add word-description__link">Добавить новую группу</div>';

        return resultMarkup;
    }

    function termItemMarkup(title, hasCharacteristic, type) {
        var resultMarkup = '';
        resultMarkup += '<div class="word-description__term-item" type="'+ type +'">' +
            '<div class="word-description__term-item-title">' +
            title +
            '</div>';
        if (hasCharacteristic) {
            resultMarkup += '<div class="word-description__term-delete word-description__link">удалить характеристику</div></div>';
        } else {
            resultMarkup += '<div class="word-description__term-add word-description__link">добавить характеристику</div></div>';
        }
        return resultMarkup;
    }

    function termMarkup(isTermBegin, isTermEnd) {
        var resultMarkup = '<div class="word-description__term-title">Характеристики слова:</div>';

        resultMarkup += termItemMarkup('Начало термина', isTermBegin, 'term-begin') +
                        termItemMarkup('Конец термина', isTermEnd, 'term-end');



        return resultMarkup;
    }

    function updateGrafanDataPopup() {
        $grafanBlock.html(grafanMarkup($currentWord.attr("grafan")));
        $grafanDeleteButton = $popup.find("." + classes.deleteGrafanButton);
        $grafanDeleteButton.on("click", deleteGrafanDescriptor);
        $addGrafanButton = $popup.find("." + classes.addGrafanButton);
        $addGrafanButton.on("click", showAdditionalGrafanDescriptorsPopup);
    }

    function updateMystemDataPopup() {
        $mystemBlock.html(mystemMarkup($currentWord.attr("mystem")));
        $mystemDeleteButton = $popup.find("." + classes.deleteMystemButton);
        $mystemDeleteButton.on("click", deleteMystemDescriptor);
        $addMystemButton = $popup.find("." + classes.addMystemButton);
        $addMystemButton.on("click", showAdditionalMystemDescriptorsPopup);
    }

    function updateTermDataPopup() {
        $termBlock.html(termMarkup($currentWord[0].hasAttribute("term-begin"), $currentWord[0].hasAttribute("term-end")));
        $termDeleteButton = $popup.find("." + classes.deleteTermButton);
        $termDeleteButton.on("click", deleteTermCharacteristic);
        $addTermButton = $popup.find("." + classes.addTermButton);
        $addTermButton.on("click", addTermCharacteristic);
    }

    function showPopup() {
        var $this = $(this);
        $currentWord = $this;
        $popupLemma.html($this.html());
        updateGrafanDataPopup();
        updateMystemDataPopup();
        updateTermDataPopup();
        $popup.addClass(classes.popupActive);
    }

    function showAdditionalGrafanDescriptorsPopup() {
        $additionalPopupSave.off("click").on("click", saveGrafanDescriptorsFromAdditionalPopup);
        $additionalPopupTitle.html("Добавление нового дескриптора");
        $additionalPopupContent.html("");

        var i,
            terms = $grafanTerms.children();
        for(i = 0; i < terms.length; ++i) {
            if ($currentWord.attr("grafan").indexOf($(terms[i]).attr("id")) == -1) {
                $additionalPopupContent.append(additionalPopupItemMarkup($(terms[i]).html(), $(terms[i]).attr("id")));
            }
        }

        $additionalPopup.addClass(classes.additionalPopupActive);
    }

    function saveGrafanDescriptorsFromAdditionalPopup() {
        var i,
            items = $additionalPopupContent.find("." + classes.additionalPopupItem),
            result = "";
        for(i = 0; i < items.length; ++i) {
            if($(items[i]).find("input[type='checkbox']").prop("checked")) {
                result += $(items[i]).attr("descriptor") + "|";
            }
        }
        $currentWord.attr("grafan", $currentWord.attr("grafan") + result);

        updateGrafanDataPopup();

        // Close popup
        $additionalPopup.removeClass(classes.additionalPopupActive);
    }

    function additionalPopupItemMarkup(term, descriptor) {
        return '<div class="additional-descriptors-popup__item" descriptor="'+ descriptor +'">' +
            '<label>' +
            '<input type="checkbox" class="additional-descriptors-popup__checkbox" />' +
            term +
            '</label>' +
            '</div>';
    }

    function showAdditionalMystemDescriptorsPopup() {
        $additionalPopupSave.off("click").on("click", saveMystemDescriptorsFromAdditionalPopup);
        $additionalPopupTitle.html("Добавление новой группы");
        $additionalPopupContent.html("");

        $additionalPopupContent.append('<input type="text" class="additional-descriptors-popup__text-input" placeholder="Лемма"/>');

        var i,
            terms = $mystemTerms.children();
        for(i = 0; i < terms.length; ++i) {
            $additionalPopupContent.append(additionalPopupItemMarkup($(terms[i]).html(), $(terms[i]).attr("id")));
        }

        $additionalPopup.addClass(classes.additionalPopupActive);
    }

    function saveMystemDescriptorsFromAdditionalPopup() {
        var i,
            lemma = $("." + classes.additionalPopupTextInput).val(),
            items = $additionalPopupContent.find("." + classes.additionalPopupItem),
            result = lemma.toLowerCase() + ":";

        for(i = 0; i < items.length; ++i) {
            if($(items[i]).find("input[type='checkbox']").prop("checked")) {
                result += $(items[i]).attr("descriptor") + ",";
            }
        }
        $currentWord.attr("mystem", $currentWord.attr("mystem") + result + "|");

        updateMystemDataPopup();

        // Close popup
        $additionalPopup.removeClass(classes.additionalPopupActive);
    }

    function closePopup() {
        $popup.removeClass(classes.popupActive);
    }

    function closeAdditionalPopup() {
        var result = confirm("Вы действительно хотите закрыть окно без сохранения?");

        if (result) {
            $additionalPopup.removeClass(classes.additionalPopupActive);
        }
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
            newDescriptors = oldDescriptors.replace(deletedDescriptor + "|", "");

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

    function deleteTermCharacteristic() {
        var $this = $(this),
            $item = $this.closest("." + classes.termItem);
        $currentWord.removeAttr($item.attr("type"));
        $this.remove();
        $item.append('<div class="word-description__term-add word-description__link">добавить характеристику</div>');
        $item.find("." + classes.addTermButton).on("click", addTermCharacteristic);
    }

    function addTermCharacteristic() {
        var $this = $(this),
            $item = $this.closest("." + classes.termItem);
        $currentWord.attr($item.attr("type"), "");
        $this.remove();
        $item.append('<div class="word-description__term-delete word-description__link">удалить характеристику</div>');
        $item.find("." + classes.deleteTermButton).on("click", deleteTermCharacteristic);
    }

    function bindEvents() {
        $word.on("click", showPopup);
        $menuItem.on("click", menuItemClickHandler);
        $closeButton.on("click", closePopup);
        $additionalPopupClose.on("click", closeAdditionalPopup);
        $additionalPopupCancel.on("click", closeAdditionalPopup);
    }

    function init() {
        initVars();
        bindEvents();
    }



    init();

});