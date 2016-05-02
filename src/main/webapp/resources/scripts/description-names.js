$(function() {

    var classes = {
        openButton: "navigation__fix-names-button",
        closeButton: "jsPopupClose",
        saveButton: "description-names__button_save",
        addGrafanTermButton: "description-names__grafan-add",
        addMystemTermButton: "description-names__mystem-add",
        popupActive: "description-names_active",
        menuItem: "description-names__menu-item",
        menuItemActive: "description-names__menu-item_active",
        grafanBlock: "description-names__grafan",
        grafanBlockItem: "description-names__grafan-item",
        mystemBlock: "description-names__mystem",
        mystemBlockItem: "description-names__mystem-item",
        grafanTermsItem: "descriptors__grafan-terms-item",
        mystemTermsItem: "descriptors__mystem-terms-item",
        nameInput: "jsNamesInput",
        nameInputEmpty: "jsNamesInput_empty",
        nameNewItem: "jsNameNewItem",
        nameNewLabel: "jsNameNewLabel",
        nameNewValue: "jsNameNewValue"
    };

    var id = {
        popup: "names-popup",
        grafanTerms: "grafan-terms",
        mystemTerms: "mystem-terms"
    };


    var $popup,
        $openButton,
        $closeButton,
        $saveButton,
        $menuItem,
        $grafanTerms,
        $mystemTerms,
        $grafanBlock,
        $mystemBlock;


    function initVars() {
        $popup = $("#" + id.popup);
        $openButton = $("." + classes.openButton);
        $closeButton = $popup.find("." + classes.closeButton);
        $saveButton = $popup.find("." + classes.saveButton);
        $menuItem = $popup.find("." + classes.menuItem);
        $grafanTerms = $("#" + id.grafanTerms);
        $mystemTerms = $("#" + id.mystemTerms);
        $grafanBlock = $popup.find("." + classes.grafanBlock);
        $mystemBlock = $popup.find("." + classes.mystemBlock);
    }


    function showPopup() {
        updateGrafanDataPopup();
        $("." + classes.addGrafanTermButton).on("click", addGrafanTerm);
        updateMystemDataPopup();
        $("." + classes.addMystemTermButton).on("click", addMystemTerm);
        $("." + classes.nameInput).on("blur", inputOnBlurHandler);
        $popup.addClass(classes.popupActive);
    }


    function closePopup() {
        var result = confirm("Вы действительно хотите закрыть окно без сохранения?");

        if (result) {
            $popup.removeClass(classes.popupActive);
        }
    }


    function updateGrafanDataPopup() {
        var i,
            grafanTermsItem = $grafanTerms.find("." + classes.grafanTermsItem),
            resultMarkup = "";

        $grafanBlock.html("");

        for(i = 0; i < grafanTermsItem.length; ++i) {
            resultMarkup += grafanTermMarkup($(grafanTermsItem.get(i)));
        }

        resultMarkup += '<div class="description-names__grafan-add description-names__link">Добавить новый дескриптор</div>';

        $grafanBlock.append(resultMarkup);
    }

    function grafanTermMarkup($item) {
        return  '<div class="description-names__grafan-item">' +
                '<div class="description-names__grafan-label">' +
                $item.html() +
                '</div>' +
                '<input class="description-names__grafan-input jsNamesInput" ' +
                'value="' + $item.attr("eng") + '" ' +
                'id="' + $item.attr("id") + '">' +
                '</div>';
    }

    function addGrafanTerm() {
        $(this).remove();
        $grafanBlock.append('<div class="description-names__grafan-item jsNameNewItem">' +
                        '<input class="description-names__grafan-new-input jsNameNewLabel">' +
                        '<input class="description-names__grafan-new-input jsNameNewValue">' +
                        '</div>' +
                        '<div class="description-names__grafan-add description-names__link">Добавить новый дескриптор</div>'
        );
        $grafanBlock.find("." + classes.addGrafanTermButton).on("click", addGrafanTerm);
    }

    function updateMystemDataPopup() {
        var i,
            mystemTermsItem = $mystemTerms.find("." + classes.mystemTermsItem),
            resultMarkup = "";

        $mystemBlock.html("");

        for(i = 0; i < mystemTermsItem.length; ++i) {
            resultMarkup += mystemTermMarkup($(mystemTermsItem.get(i)));
        }

        resultMarkup += '<div class="description-names__mystem-add description-names__link">Добавить новый дескриптор</div>';

        $mystemBlock.append(resultMarkup);
    }

    function mystemTermMarkup($item) {
        return  '<div class="description-names__mystem-item">' +
            '<div class="description-names__mystem-label" id="' + $item.attr("id") + '">' +
            $item.html() +
            '</div>' +
            '<input class="description-names__mystem-input jsNamesInput" ' +
            'value="' + $item.attr("eng") + '" ' +
            'id="' + $item.attr("id") + '">' +
            '</div>';
    }

    function addMystemTerm() {
        $(this).remove();
        $mystemBlock.append('<div class="description-names__mystem-item jsNameNewItem">' +
            '<input class="description-names__mystem-new-input jsNameNewLabel">' +
            '<input class="description-names__mystem-new-input jsNameNewValue">' +
            '</div>' +
            '<div class="description-names__mystem-add description-names__link">Добавить новый дескриптор</div>'
        );
        $mystemBlock.find("." + classes.addMystemTermButton).on("click", addMystemTerm);
    }

    function saveChanges() {
        if($("." + classes.nameInputEmpty).length) {
            alert("Необходимо заполнить все текстовые поля");
        } else {

            // Сохранение изменений

            var inputs = $("." + classes.nameInput),
                i, id, val;

            for(i = 0; i < inputs.length; ++i) {
                id = $(inputs.get(i)).attr("id");
                val = $(inputs.get(i)).val();

                $("#" + id).attr("eng", val);
            }

            // Добавление новых дескрипторов

            var $newItems = $("." + classes.nameNewItem);

            for(i = 0; i < $newItems.length; ++i) {
                var $newItem = $($newItems.get(i)),
                    label = $newItem.find("." + classes.nameNewLabel).val(),
                    value = $newItem.find("." + classes.nameNewValue).val();

                if(label !== "" && value !== "") {
                    if ($newItem.hasClass(classes.grafanBlockItem)) {
                        $grafanTerms.append('<p id="'+ value +'" eng="'+ value +'" class="descriptors__grafan-terms-item">'+ label +'</p>');
                    }
                    if ($newItem.hasClass(classes.mystemBlockItem)) {
                        $mystemTerms.append('<p id="'+ value +'" eng="'+ value +'" class="descriptors__mystem-terms-item">'+ label +'</p>');
                    }
                }
            }

            // Закрытие окна

            $popup.removeClass(classes.popupActive);
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


    function inputOnBlurHandler() {
        var $this = $(this);

        if($this.val() == "") {
            $this.addClass(classes.nameInputEmpty);
        } else {
            $this.removeClass(classes.nameInputEmpty);
        }
    }


    function bindEvents() {
        $openButton.on("click", showPopup);
        $menuItem.on("click", menuItemClickHandler);
        $closeButton.on("click", closePopup);
        $saveButton.on("click", saveChanges);
    }

    function init() {
        initVars();
        bindEvents();
    }



    init();

});