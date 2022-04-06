function getLanguage() {
    return document.documentElement.lang
}
function addBodyLoader() {
    $("body").addClass("loading");
}
function removeBodyLoader() {
    $("body").removeClass("loading");
}
// init simple accordio
function initAccordion() {
    const accordion = $(".js-accordion");

    accordion.on("click", ".js-accordion-head", function() {
        $(this).toggleClass("active");
        const body = $(this).siblings(".js-accordion-body");
        body.stop().slideToggle(250, function() {
            if ($(this).closest(".sidebar").length) {
                $(this).closest(".sidebar").toggleClass("active")
            }
        })
    })
}
// init simple dropdown
function initDropdown() {
    $(window).on("click", function() {
        $("[data-dropdown]").removeClass("dropdown_active")
    })
    // $(document).on("click", function(e) {
    //     const target = $(e.target);
    //     if (!(target.closest("[data-dropdown-parent]").length)) {
    //         $(".dropdown_active").removeClass("dropdown_active")
    //     }
    // })
    
    $(document).on("click", "[data-dropdown-target]", function(e) {
        e.stopPropagation();
        const target = $(this).data("dropdown-target");
        const dropdown = $("[data-dropdown=" + target + "]")
        dropdown.toggleClass("dropdown_active");
        $("[data-dropdown]").not(dropdown).removeClass("dropdown_active")
    })
}
// on input type="file" changed callback
function onFileSelected(event) {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
  
    const image = $(this).siblings(".img");
    // imgtag.title = selectedFile.name;
  
    reader.onload = function(event) {
        image.css("background-image", "url('"+event.target.result+"')");
        console.log(event.target.result);
    };
  
    if (selectedFile)
        reader.readAsDataURL(selectedFile);
    image.css("background-image", "");
}
// on clients remove icon clicked callback
function onClientsRemoveConfirmed(id) {
    if (isNaN(parseInt(id))) alert("Something went wrong")
    addBodyLoader()
    setTimeout(function() {
        const target = $('[data-clients-row="'+id+'"]')
        target.remove()
        removeBodyLoader()
    }, 2000)
}

function onClientsRemoved(id) {
    const modal = $('.mymodal_confirmation'); // get delete confiramation modal
    $(document).on("opening", modal, function() {
        const title = getLanguage() === "ru" ? `Вы уверены что хотите удалить ID ${id}` : `Are you sure you want to delete ID${id}`
        $(this).find(".confiramtion-title").text(title);
    });

    $(document).on("confirmation", modal, onClientsRemoveConfirmed.bind(this, id));

    $(document).on("closed", modal, function() {
        $(this).find(".confiramtion-title").text("")
        $(document).off("confirmation", modal, onClientsRemoveConfirmed);
    });

    modal.mymodal().open();
}
// extimates
function onEstimatesShowed(id) {
    alert("show " + id);
}
// return radios prev value on request error
function getRadioPrev(event) {
    const _target = event.target
    const list = $(_target).closest(".radio__list")
    const prevInput = list.find(".radio__prev")
    const prevValue = prevInput.val()

    return {
        input: prevInput,
        value: prevValue,
        radio: list.find('[value="'+prevValue+'"]')
    }
}

function onEstimatesChanged(event, id) {
    const prev = getRadioPrev(event)
    console.log("#", id, "estimated status changed to", event.target.value);
    prev.input.val(event.target.value)
    /* 
        if reauqest will fail
        then change value again to prev
        prev.radio.prop("checked", true)
        else change prevInput value to checked
        prev.input.val(event.target.value)
    */
}

function onCarsStatusChanged(event, id) {
    const prev = getRadioPrev(event)
    console.log("#", id, "cars status changed to", event.target.value);
    prev.input.val(event.target.value)
    /* 
        if reauqest will fall
        then change value again to prev
        prev.radio.prop("checked", true)
        else change prevInput value to checked
        prev.input.val(event.target.value)
    */
}
// INVOICES
function onInvoicesEdited(id) {
    console.log("edit invoice", id);
}
// CONTACTS
function onContactsActiveChanged(event, id) {
    console.log("contacts active changed", id, event.target.checked);
}

function onContactsPaymentChanged(event, id) {
    console.log("contacts payment status changed", id, event.target.checked);
}
// TASK LIST SORTING
function initDragDropSortable() {
    let position_updated = false
    
    $('.column__list').sortable({
        connectWith: ".column__list",
        placeholder: "column__placeholder",
        forcePlaceholderSize: true,
        cancel: "select",
        update: function(e, ui) {
            position_updated = !ui.sender
        },
        stop: function(event, ui) {
            if (position_updated) {
                const item = ui.item;
                const parent = item.parent();
                const task = parent.attr("data-task"); // task column name
                const sortedList = parent.sortable("toArray", {attribute: "data-id"}); // list of sorted elements in task
                /*
                    addBodyLoader();
                    request to server
                    error: function() {
                        parent.sortable("cancel")
                    },
                    finally: function() {
                        removeBodyLoader();
                    }
                */
                console.log(sortedList);
                position_updated = false;
            }
        },
        receive: function(event, ui) {
            const item = ui.item;
            const parent = item.parent();
            const sender = item.sender;
            const task = parent.attr("data-task"); // task column name
            const sortedList = parent.sortable("toArray", {attribute: "data-id"}); // list of sorted elements in task
            /*
                addBodyLoader();
                request to server
                error: function() {
                    sender.sortable("cancel")
                },
                finally: function() {
                    removeBodyLoader();
                }
            */
            console.log(sortedList);
        }
    })
}

function addCardToList(data) {
    const {
        card: {
            id,
            date,
            title,
            deadline,
            in_charge
        },
        task
    } = data

    const list = $("[data-task='"+task+"']");

    if (list.length) {
        const card = $(".task-template").clone();
    
        card.removeClass("task-template").attr("data-id", id);
        card.find("[data-t-id]").text(id);
        card.find("[data-t-date]").text(date);
        card.find("[data-t-title]").text(title);
        card.find("[data-t-deadline]").text(deadline);
        
        const select = card.find("select");
        select
            .attr("name", `in_charge[${id}]`)
            .val(in_charge)

        list.append(card);
        if (list.hasClass("ui-sortable")) list.sortable("refresh")
    }
    
}

function addTask() {
    // OPEN MODAL TO CREATE TASK
    // IF FORM SUBMITED ADD TASK
    // ELSE SHOW NOTICE
    addCardToList({
        card: {
            id: 100,
            date: "15 сентябра 2022",
            title: "Задача ID100",
            deadline: "15 сентябра 2022",
            in_charge: 0
        },
        task: "waiting"
    })
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
        $(document).off("confirmation", modal, onRolesRemoveConfirmed);
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
        $(document).off("confirmation", modal, onUserRolesRemoveConfirmed);
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

// NOTIFICATIONS PAGE
function onNotificationsAdd() {
    console.log("add notification");
}

$(function() {
    initAccordion();
    initDropdown();
    $('.js-form-file').on("change", onFileSelected)
    initDragDropSortable()

    
})