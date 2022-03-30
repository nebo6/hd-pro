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
function onClientsRemvoeConfirmed() {
    const id = parseInt($(this).data("id"))
    if (isNaN(id)) alert("Something went wrong")
    $("body").addClass("loading");
    setTimeout(function() {
        const target = $('[data-clients-row="'+id+'"]')
        target.remove()
        $("body").removeClass("loading");
        console.log("removed", id);
    }, 2000)
}

function onClientsRemoved(id) {
    const modal = $('[data-mymodal-id="remove-modal"]'); // get delete nitification modal
    $(document).on("opening", modal, function() {
        if (!id) $(this).find(".id").text("NONE")
        $(this).find(".id").text(id);
        $(this).data("id", id);
    });
    $(document).on("confirmation", modal, onClientsRemvoeConfirmed);
    $(document).on("closed", modal, function() {
        $(this).find(".id").text("NONE");
        $(this).data("id", undefined);
        $(document).off("confirmation", modal, onClientsRemvoeConfirmed);
    });

    modal.mymodal().open();
}

$(function() {
    initAccordion();
    initDropdown();

    $('.js-form-file').on("change", onFileSelected)
    
})