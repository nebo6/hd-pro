// REMOVE Notification FROM LIST
function onNotificationSettingRemoveConfirmed(id) {
    if (isNaN(parseInt(id))) alert("Something went wrong")
    addBodyLoader()
    setTimeout(function() {
        const target = $('[data-not-id="'+id+'"]')
        target.remove()
        removeBodyLoader()
    }, 2000)
}

function onRemoveNotificationSetting(id) {
    const modal = $('.mymodal_confirmation'); // get delete confiramation modal
    $(document).on("opening", modal, function() {
        const title = getLanguage() === "ru" ? `Вы уверены, что хотите удалить уведомление ID ${id}?` : `Are you sure you want to delete a notification ID${id}?`
        $(this).find(".confiramtion-title").text(title);
    });
    $(document).on("confirmation", modal, onNotificationSettingRemoveConfirmed.bind(this, id));
    $(document).on("closed", modal, function() {
        $(this).find(".confiramtion-title").text("")
        $(document).off("confirmation", onNotificationSettingRemoveConfirmed);
    });

    modal.mymodal().open();
}

$(function() {
    $(document).on("click", "[data-not-id] .remove-btn", function(e) {
        e.stopPropagation(); 
        const not = $(this).closest("[data-not-id]");
        const id = not.data("not-id")
        onRemoveNotificationSetting(id)
    })
})