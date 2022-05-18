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
    // $(document).on("cancellation", modal, onCancel)

    $(document).on("closed", modal, function(e) {
        if (e.reason !== "confirmation") {
            onCancel()
        }
        
        $(document).off("confirmation", onConfirm)
        $(document).off("cancellation", onCancel)
        $(document).off("opening", onOpening );
    })
    $(modal).mymodal().open();
    
}
// REMOVE PROJECT FROM LIST
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
// SHOW PROJECT DETAILS
const dummyProject = {
    title: "LAND CRUISER PRADO",
    vin: "33-443-222233",
    year: "2020",
    model: "Модель",
    number: "A 555 BB",
    color: "Белый",
    mileage: "40 000",
    date: "20.04.2022",
    master: {
        label: "Имя Мастера",
        value: 0
    },
    client: {
        label: "Имя Клиента",
        value: 1
    },
    insurance: "Номер страховки",
    img: "./img/land-cruiser-prado.jpg",
    file: "./img/land-cruiser-prado.jpg"
}
// PROJECT'S DETAIL MODAL WINDOW
// UPDATE DETAIL DATA ON CLICK ON ROW
function updateProjectData(data) {
    const {
        title,
        vin,
        year,
        model,
        number,
        color,
        mileage,
        date,
        master,
        client,
        insurance,
        img,
        file
    } = data
    const template = $('.project-modal-template').clone(true);
    template.removeClass("project-modal-template d-none");
    // update data
    template.find("[data-t-title]").text(title)
    template.find("[data-t-vin]").text(vin)
    template.find("[data-t-year]").text(year)
    template.find("[data-t-model]").text(model)
    template.find("[data-t-number]").text(number)
    template.find("[data-t-color]").text(color)
    template.find("[data-t-mileage]").text(mileage)
    template.find("[data-t-date]").text(date)
    template.find("[data-t-master]").text(master.label)
    template.find("[data-t-client]").text(client.label)
    template.find("[data-t-insurance]").text(insurance)
    template.find("[data-t-img]").attr({"src": img, "alt": title})
    $("[data-t-estimate]").attr("href", file)
    // append to modal
    $('[data-mymodal-id="show-project"] .mymodal__body').replaceWith(template)
}
// SHOW DETAIL DATA ON CLICK ON ROW
function onProjectShowed(id) {
    console.log(id);
    addBodyLoader();
    function onSuccess(data) {
        updateProjectData(data)
        $('[data-mymodal-id="show-project"]').mymodal().open()
    }
    function onError() {
        alertNotice(errorTitle(), errorDescription(), "danger")
    }
    // get project's data from server
    // onSuccess()
    onSuccess(dummyProject)
    // onError()
    // onFinally
    removeBodyLoader();
}
// ADD NEW PROJECT
function addProject(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form)
    addBodyLoader();
    function onSuccess(data) {
        // reload or add row to start of table
        location.reload();
    }
    function onError() {
        alertNotice(errorTitle(), errorDescription(), "danger")
    }
    // create project's data from server
    // onSuccess()
    onSuccess(dummyProject)
    // onError()
    // onFinally
    removeBodyLoader();
}
// EDIT PROJECT
function onEditProject(id) {
    console.log(id);
    addBodyLoader();
    function onSuccess(data) {
        const form = $('[data-mymodal-id="edit-project"] .form').clone(true);

        form.find('.img').css("background-image", "url("+data.img+")");
        form.find('[name="title"]').val(data.title);
        form.find('[name="vin"]').val(data.vin);
        form.find('[name="year"]').val(data.year);
        form.find('[name="model"]').val(data.model);
        form.find('[name="color"]').val(data.color);
        form.find('[name="mileage"]').val(data.mileage);
        form.find('[name="master"]').val(data.master.value);
        form.find('[name="client"]').val(data.client.value);
        form.find('[name="insurance"]').val(data.insurance);

        $('[data-mymodal-id="edit-project"] .form').replaceWith(form)
        // open modal after request
        $('[data-mymodal-id="edit-project"]').mymodal().open();
    }
    function onError() {
        alertNotice(errorTitle(), errorDescription(), "danger");
    }
    function onFinally() {
        removeBodyLoader();
    }
    // request to get data from server with project's id
    // if succes
    onSuccess(dummyProject);
    // if error 
    // onError()
    onFinally();
}