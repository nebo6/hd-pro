// REGISTRATION ON INPUT TYPE="FILE" CHANGED CALLBACK
function onFileSelected(event) {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
  
    const img = $(this).siblings(".img");
  
    reader.onload = function(event) {
        img.css("background-image", "url('"+event.target.result+"')");
    };
  
    if (selectedFile)
        reader.readAsDataURL(selectedFile);
   
    img.css("background-image", "");
}
// CONTACTS
function onContactsActiveChanged(event, id) {
    console.log("contacts active changed", id, event.target.checked);
}

function onContactsPaymentChanged(event, id) {
    console.log("contacts payment status changed", id, event.target.checked);
}


// ROLES
function onRolesRemoveConfirmed(id) {
    if (isNaN(parseInt(id))) alert("Something went wrong")
    addBodyLoader()
    setTimeout(function() {
        const target = $('[data-roles-row="'+id+'"]')
        target.remove()
        removeBodyLoader()
    }, 2000)
}

function onRoleRemoved(id) {
    const modal = $('.mymodal_confirmation'); // get delete confiramation modal
    $(document).on("opening", modal, function() {
        const title = getLanguage() === "ru" ? `Вы уверены что хотите удалить роль ID ${id}` : `Are you sure you want to delete role ID${id}`
        $(this).find(".confiramtion-title").text(title);
    });
    $(document).on("confirmation", modal, onRolesRemoveConfirmed.bind(this, id));
    $(document).on("closed", modal, function() {
        $(this).find(".confiramtion-title").text("")
        $(document).off("confirmation", onRolesRemoveConfirmed);
    });

    modal.mymodal().open();
}

function onRoleEdited(id) {
    console.log("edit role", id);
}

function onRoleOptions(id) {
    console.log("roles option", id);
}

function addRoleToList({title, id}) {
    const list = $("[data-roles]")
    const tr = `<tr data-roles-row="${id}"> 
                    <td><b>${title}</b></td>
                    <td class="text-right">
                        <button class="btn btn_clean" type="button" onclick="onRoleEdited(${id})">
                            <span class="table__icon table__icon_edit"></span>
                        </button>
                        <button type="button" class="btn btn_clean" onclick="onRoleOptions(${id})">
                            <span class="table__icon table__icon_options"></span>
                        </button>
                        <button type="button" class="btn btn_clean" onclick="onRoleRemoved(${id})">
                            <span class="table__icon table__icon_remove"></span>
                        </button>
                    </td>
                </tr>`
    console.log(tr, list);
    list.append(tr)
}

function createRole() {
    // request to server for create a role
    // then add tr in list of roles
    addRoleToList({
        title: "Роль",
        id: 100
    })
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
}

function onUserRoleOptions(id) {
    console.log("user roles option", id);
}

function addUserRoleToList({name, role, id}) {
    const list = $("[data-user-roles]")
    const tr = `<tr data-roles-row="${id}"> 
                    <td>${name}</td>
                    <td>${role}</td>
                    <td class="text-right">
                        <button class="btn btn_clean" type="button" onclick="onUserRoleEdited(${id})">
                            <span class="table__icon table__icon_edit"></span>
                        </button>
                        <button type="button" class="btn btn_clean" onclick="onUserRoleOptions(${id})">
                            <span class="table__icon table__icon_options"></span>
                        </button>
                        <button type="button" class="btn btn_clean" onclick="onUserRoleRemoved(${id})">
                            <span class="table__icon table__icon_remove"></span>
                        </button>
                    </td>
                </tr>`
    list.append(tr)
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
    $(".phone-mask").inputmask({
        mask: [ "+33-9-99-99-99-99", "+35\\9 (999) 999-999" ],
        keepStatic: false,
        greedy: false,
        clearMaskOnLostFocus: true
    })
    $(".website-mask").inputmask({
        mask: "http[s]://[*|.]{*}",
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
    if (window.Fancybox) Fancybox.defaults.Hash = false;
})