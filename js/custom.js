// REGISTRATION ON INPUT TYPE="FILE" CHANGED CALLBACK
function onFileSelected(event) {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
  
    const img = $(this).siblings(".img");
    const label = $(this).siblings(".input__label")
  
    reader.onload = function(event) {
        img.css("background-image", "url('"+event.target.result+"')");
        label.hide()
    };
  
    if (selectedFile) {
        reader.readAsDataURL(selectedFile);
    }
   
    img.css("background-image", "");
    label.show()
}
// CONTACTS
function onContactsActiveChanged(event, id) {
    console.log("contacts active changed", id, event.target.checked);
}

function onContactsPaymentChanged(event, id) {
    console.log("contacts payment status changed", id, event.target.checked);
}

// USER ROLES
function onUserRolesRemoveConfirmed(id) {
    if (isNaN(parseInt(id))) alert("Something went wrong")
    addBodyLoader()
    setTimeout(function() {
        const target = $('[data-user-roles-row="'+id+'"]')
        target.remove()
        removeBodyLoader()
    }, 2000)
}

function onUserRoleRemoved(id) {
    const modal = $('.mymodal_confirmation'); // get delete confiramation modal
    $(document).on("opening", modal, function() {
        const title = getLanguage() === "ru" ? `Вы уверены что хотите удалить пользовотеля ID ${id}` : `Are you sure you want to delete user ID${id}`
        $(this).find(".confiramtion-title").text(title);
    });
    $(document).on("confirmation", modal, onUserRolesRemoveConfirmed.bind(this, id));
    $(document).on("closed", modal, function() {
        $(this).find(".confiramtion-title").text("")
        $(document).off("confirmation", onUserRolesRemoveConfirmed);
    });

    modal.mymodal().open();
}

function onUserRoleEdited(id) {
    console.log("edit user role", id);
    $("[data-mymodal-id='edit-role-user']").mymodal().open()
}

// PRINT TABLE
const tableStyles = `<style>
    body { margin: 0; }
    table {
        width: 100%;
        border-spacing: 0;
        border-collapse: collapse;
        font-size: 14px;
    }
    tbody, td, tfoot, th, thead, tr {
        border-color: inherit;
        border-style: solid;
        border-width: 0
    }
    thead { text-align: left; }
    td, th { border: 1px solid #999; padding: 2px }
    .no-print {
        display: none
    }
    .table-word-wrap {
        max-width: 170px;
    }
</style>`

function printDiv(selector) {
    var divToPrint = document.getElementById(selector);
    var newWin=window.open('','Print-Window');
    newWin.document.open();
    // onload="window.print()"
    newWin.document.write(`<html>
        <body onload="window.print()">
            ${tableStyles}
            ${divToPrint.outerHTML}
        </body></html>`);
    newWin.document.close();
    setTimeout(function(){newWin.close();},100);
}

function initializeTelMask(reinit) {
    $(".phone-mask").each(function(idx, el) {
        // problems with clone / all clonable has elements has "template" in class name
        if (!$(el).closest("[class*='template']").length) {
            $(el).inputmask({
                mask: "+35\\9 999 999 999",
                clearMaskOnLostFocus: true,
            })
        }
    })
    $(".phone-flag").each(function(idx, el) {
        // problems with clone / all clonable has elements has "template" in class name
        if (!$(el).closest("[class*='template']").length) {
            $(el).intlTelInput({
                initialCountry: "bg", // 359
                preferredCountries: ["bg", "fr"],
                utilsScript: "/libs/intl-phone-mask/utils.js",
            }).on("countrychange", function() {
                const dialCode = $(this).intlTelInput("getSelectedCountryData").dialCode.replace(/9/g,"\\9");
                const numberMask = $(this).attr("placeholder").replace(/\d/g, "9").replace(/^0/,"");
                const phone = $(this).closest(".phone-mask-wrapper").find(".phone-mask")
                phone.val("").inputmask({
                    mask: `+${dialCode} ${numberMask}`,
                    clearMaskOnLostFocus: true,
                    onincomplete: function() {
                        $(this).val("");
                    }
                }).focus()
            })
        }
    })
}

// it could usefull with modal. Plugin won't work correctly with modal
function reinitTelMask() {
    $(".phone-flag").intlTelInput("destroy");
    initializeTelMask()
}

$(function() {
    $('.js-form-file').on("change", onFileSelected)
    $(".dollar-mask").inputmask({
        alias : "currency",
        prefix: '$',
        groupSeparator: " ",
        rightAlign: false,
        allowMinus:false,
    })
    $(".date-mask").inputmask({
        alias: 'datetime',
        inputFormat: 'dd.mm.yyyy',
    })
    initializeTelMask()
    $(".website-mask").inputmask({
        mask: "https://[*|.]{*}",
        greedy: false,
        clearMaskOnLostFocus: true
    })
    $(".percentage-mask").inputmask({
        alias:"decimal",
        integerDigits:9,
        digits:0,
        max: 99,
        allowMinus:false,
        digitsOptional: false,
        placeholder: "0",
        suffix: "%",
    })
    $(".tg-mask").inputmask({
        mask: "@[*|_]{*}"
    })
    if (window.Fancybox) Fancybox.defaults.Hash = false;
    $(".select.no-print select").on("change", function() {
        const name = $(this).attr("name")
        const text = this.options[this.selectedIndex].innerHTML
        $(".select-for-print[data-name='"+name+"']").text(text)
    })
})