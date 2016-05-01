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

});