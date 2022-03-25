function initAccordion() {
    const accordion = $(".js-accordion");

    accordion.on("click", ".js-accordion-head", function() {
        $(this).toggleClass("active");
        const body = $(this).siblings(".js-accordion-body");
        body.stop().slideToggle(250)
    })
}

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

$(function() {
    initAccordion();
    initDropdown();
})