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
        body.stop().slideToggle(250)
    })
}
// init simple dropdown
function initDropdown() {
    $(document).on("click", function(e) {
        const target = $(e.target);
        if (!(target.closest("[data-dropdown-parent]").length)) {
            $(".dropdown_active").removeClass("dropdown_active")
        }
    })
    
    $(document).on("click", "[data-dropdown-target]", function() {
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
function onClientsRemvoeConfirmed(id) {
    if (isNaN(parseInt(id))) alert("Something went wrong")
    addBodyLoader
    setTimeout(function() {
        const target = $('[data-clients-row="'+id+'"]')
        target.remove()
        removeBodyLoader
    }, 2000)
}

function onClientsRemoved(id) {
    const modal = $('.mymodal_confirmation'); // get delete confiramation modal
    $(document).on("opening", modal, function() {
        const title = getLanguage() === "ru" ? `Вы уверены что хотите удалить ID ${id}` : `Are you sure you want to delete ID${id}`
        $(this).find(".confiramtion-title").text(title);
    });
    $(document).on("confirmation", modal, onClientsRemvoeConfirmed.bind(modal, id));
    $(document).on("closed", modal, function() {
        $(this).find(".confiramtion-title").text("")
        $(document).off("confirmation", modal, onClientsRemvoeConfirmed);
    });

    modal.mymodal().open();
}

function onEstimatesShowed(id) {
    alert("show " + id);
}

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

function onInvoicesEdited(id) {
    console.log("edit invoice", id);
}

function onContactsActiveChanged(event, id) {
    console.log("contacts active changed", id, event.target.checked);
}

function onContactsPaymentChanged(event, id) {
    console.log("contacts payment status changed", id, event.target.checked);
}

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

$(function() {
    initAccordion();
    initDropdown();
    $('.js-form-file').on("change", onFileSelected)
    initDragDropSortable()

    
})