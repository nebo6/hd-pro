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