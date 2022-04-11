function getLanguage() {
    return document.documentElement.lang
}
function addBodyLoader() {
    $("body").addClass("loading");
}
function removeBodyLoader() {
    $("body").removeClass("loading");
}
// common locales
function editTitle() { return getLanguage() === "ru" ? "Редактировать" : "Edit" }
function deleteTitle() { return getLanguage() === "ru" ? "Удалить" : "Delete" }
function uploadFileTitle() { return getLanguage() === "ru" ? "Загрузите файл" : "Upload File" }
function errorTitle() { return getLanguage() === "ru" ? "Ошибка" : "Error" }
function errorDescription() { return getLanguage() === "ru" ? "Произошла ошибка. Попробуйте снова" : "An error has occurred. Try it again later" }
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
    
    $(document).on("click", "[data-dropdown-target]", function(e) {
        e.stopPropagation();
        const target = $(this).data("dropdown-target");
        const dropdown = $("[data-dropdown=" + target + "]")
        dropdown.toggleClass("dropdown_active");
        $("[data-dropdown]").not(dropdown).removeClass("dropdown_active")
    })
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
// alert
function closeAlert(alert, callback) {
    alert.slideUp(200, function() {
        $(this).remove()
        if (typeof callback === "function") callback()
    })
}
// type: "success" | "danger" | "info" | "deadline"
function alertNotice(title, text, type, time) {
    time = time === undefined ? 5000 : time
    const alert = $(".alert.template").clone().removeClass("template");
    const btn = alert.find(".alert__clsoe");
    let timeout;
    if (time) {
        timeout = setTimeout(function() {
            closeAlert(alert, function() { clearTimeout(timeout) })
        }, time)
    }
    btn.on("click", function() {
        closeAlert(alert, function() { clearTimeout(timeout) })
    })
    alert.find(".alert__progress").css("animation-duration", time+"ms")
    alert.find(".alert__title").text(title);
    alert.find(".alert__description").text(text);
    alert.addClass(type);
    alert.appendTo(".alert__list").slideDown(200)
}

$(function() {
    initAccordion();
    initDropdown();
})