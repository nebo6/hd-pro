const dummyInvoice = {
    client: 0,
    project: 0,
    payday: "11.12.2022",
    deadline: "11.12.2022",
    summ: "12 500$",
    paid: "2 500$",
    status: 1
}

// addInvoice
function addInvoice(event) {
    event.preventDefault();
    const form = event.target;
    console.log("invoice created")
}

// INVOICES
function onInvoicesSubmited(event) {
    event.preventDefault();
    const form = event.target;
    const data = $(form).serialize();
    addBodyLoader();
    // server request with data
    // success callback
    // error callback
    removeBodyLoader();    
}

function updateInvoicesForm(data) {
    const form = $(".js-invoices-edit-form").detach();
    form.find('[name="client"]').val(data.client)
    form.find('[name="project"]').val(data.project)
    form.find('[name="payday"]').val(data.payday)
    form.find('[name="deadline"]').val(data.deadline)
    form.find('[name="summ"]').val(data.summ)
    form.find('[name="paid"]').val(data.paid)
    form.find('[name="status"]').val(data.status)
    form.onsubmit = onInvoicesSubmited
    form.appendTo(".js-invoices-edit-form-wrapper")
}

function onInvoicesEdited(id) {
    console.log("edit invoice", id);
    addBodyLoader();
    // get data from server
    updateInvoicesForm(dummyInvoice) // update form data
    $('[data-mymodal-id="edit-invoices"]').mymodal().open() // open after form updated
    // onError alertNotice
    removeBodyLoader();
}