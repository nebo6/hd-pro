// projects or cars
// CHANGE PROJECT'S STATUS
function onProjectStatusChanged(event, id) {
    const prev = getRadioPrev(event)
    function onSuccess() {
        $('[data-project-row="'+id+'"]').addClass("ready");
        // change prev val but it's useless now, after design fixes
        prev.input.val(event.target.value)
    }
    function onError() { 
        prev.radio.prop("checked", true) 
        alertNotice(errorTitle(), errorDescription(), "danger")
    }
    function onFinally() { removeBodyLoader(); }
    function onCancel() { prev.radio.prop("checked", true) }
    function onConfirm() {
        addBodyLoader();
        console.log(id);
        // server request
        // onSuccess()
        onError()
        // finally
        onFinally();
    }
    onStatusChangeConfirmation(onConfirm, onCancel)
}

function onStatusChangeConfirmation(onConfirm, onCancel) {
    const modal = $('.mymodal_confirmation'); // confiramation modal
    function onOpening() {
        const title = getLanguage() === "ru" ? `Вы уверены, что работа окончена?` : `Are you sure the job is done?`
        $(this).find(".confiramtion-title").text(title);
    }
    $(document).on("opening", modal, onOpening );
    $(document).on("confirmation", modal, onConfirm)
    $(document).on("cancellation", modal, onCancel)

    $(document).on("closed", modal, function() {
        $(document).off("confirmation", onConfirm)
        $(document).off("cancellation", onCancel)
        $(document).off("opening", onOpening );
    })
    $(modal).mymodal().open();
    
}

function onProjectRemoveConfirmed(id) {
    if (isNaN(parseInt(id))) alert("Something went wrong")
    addBodyLoader()
    setTimeout(function() {
        const target = $('[data-project-row="'+id+'"]')
        target.remove()
        removeBodyLoader()
    }, 2000)
}

function onRemoveProject(id) {
    const modal = $('.mymodal_confirmation'); // get delete confiramation modal
    $(document).on("opening", modal, function() {
        const title = getLanguage() === "ru" ? `Вы уверены, что хотите удалить проект ID ${id}?` : `Are you sure you want to delete a project ID${id}?`
        $(this).find(".confiramtion-title").text(title);
    });
    $(document).on("confirmation", modal, onProjectRemoveConfirmed.bind(this, id));
    $(document).on("closed", modal, function() {
        $(this).find(".confiramtion-title").text("")
        $(document).off("confirmation", onProjectRemoveConfirmed);
    });

    modal.mymodal().open();
}