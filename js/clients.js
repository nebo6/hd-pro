// UPDATE MODAL TO SHOW CLIENTS FULL INFO WITH ID 
function updateModal(client) {
    const {
        currentCars, // Количество машин в работе
        summ, // Текущая сумма работы
        paid, // Оплачанная часть работы
        debt, // Остаток по работе
        company, // Название компании клиента
        allCars, // Все машины клиента
        bill, // Количество Всех Счетов
        payments, // Количество Всех платежей
        estimates, // Количество смет
        expenses, // Расходы клиента
        viber,
        telegram,
        whatsapp,
        web,
        files // файлы (с информацией, добавленной администратором),
    } = client
    
    const template = $(".client-modal-template").clone(true);
    template.removeClass("client-modal-template d-none");
    // top statistics
    template.find("[data-t-ccars]").text(currentCars)
    template.find("[data-t-summ]").text(summ)
    template.find("[data-t-paid]").text(paid)
    template.find("[data-t-debt]").text(debt)
    // table info
    template.find("[data-t-company]").text(company)
    template.find("[data-t-acars]").text(allCars)
    template.find("[data-t-bill]").text(bill)
    template.find("[data-t-payments]").text(payments)
    template.find("[data-t-estimates]").text(estimates)
    template.find("[data-t-expenses]").text(expenses)
    // links
    viber && template.find("[data-t-viber]")
        .attr("href", `viber://pa?chatURI=${viber}`)
        .text(viber)
    telegram && template.find("[data-t-telegram]")
        .attr("href", `https://telegram.me/${telegram}`)
        .text(telegram)
    whatsapp && template.find("[data-t-whatsapp]")
        .attr("href", `https://wa.me/${whatsapp}`)
        .text(whatsapp)
    web && template.find("[data-t-web]")
        .attr("href", web)
        .text(web)
    // files
    /*
        files = [{
            title — title of file | file.pdf, 
            href — link to file | /files/file.pdf
        }]
    */
    if (files.length) {
        template.find("[data-t-web]")
            .attr("href", files[0].href)
            .text(files[0].title)
        
            console.log(files);
            
        if (files.length > 1) {
            let tr = ""
            for(let i = 1; i < files.length; i++) {
                tr += `<tr>
                    <th></th>
                    <td><a href="${files[i].href}" target="_blank" class="link-nowrap">${files[i].title}</a></td>
                </tr>`
            }
            $(tr).appendTo(template.find('tbody'))
        }
    }
    
    $('[data-mymodal-id="show-client"] .mymodal__body').replaceWith(template)
}
// DUMMY DATA TO CREATE A CLIENT'S MODAL
const clientDummyData = {
    currentCars: 2,
    summ: "1k$",
    paid: "613$",
    debt: "487$",
    // used to update form
    company: "Company Name",
    allCars: "22",
    bill: 3,
    payments: 31,
    estimates: 41,
    expenses: 12,
    viber: "acc",
    telegram: "olzh_zh",
    whatsapp: "77777777777",
    web: "www.somesite.com",
    files: [{
        id: 0,
        title: "Название_Файла.docx",
        href: "#"
    },{
        id: 1,
        title: "Название_Файла.docxНазвание_Файла.docx",
        href: "#"
    }],
}
// WHEN CLIENT WAS CLICKED
function onClientShowed(id) {
    addBodyLoader();
    // request to get client's info
    // if status OK and get client info
    updateModal(clientDummyData)
    $('[data-mymodal-id="show-client"]').mymodal().open()
    // or show error message
    // on finally removeBodyLoader
    removeBodyLoader()
}
// EDIT CLIENT'S INFO
let filesToRemove = [];
function removeOldFile(event, id) { 
    $(event.target).closest(".file").remove();
    filesToRemove.push(id);
}
function removeNewFile(event, id) {
    $(event.target).closest(".file").remove();
    $('[data-file-input="'+id+'"]').remove();
}
// create clients components
function createFileItem(id, title, old) {
    const onClickCallback = old ? `removeOldFile(event, ${id})` : `removeNewFile(event, ${id})`
    
    return `<div class="row align-items-center file">
                <div class="col file__title">${title}</div>
                <div class="col-auto">
                    <button class="btn btn_clean d-block" type="button" onclick="${onClickCallback}" title="${deleteTitle()}">
                        <span class="table__icon table__icon_remove_red"></span>
                    </button>
                </div>
            </div>`
}

function createFileInput(id) {
    return `<label class="files__upload" data-file-input="${id}">
        <input type="file" name="file[]" class="d-none files__control">
        <div class="row align-items-center justify-content-end">
            <div class="col-auto"></div>
            <div class="col-auto">
                <span class="table__icon table__icon_upload_red"></span>
            </div>
        </div>
    </label>`
}
// create new tr for replace old after edit or for prepend to list after create new client
function createClientRow(data) {
    return `<tr data-clients-row="${data.id}" onclick="onClientShowed(${data.id})">
        <td>${data.id}</td>
        <td>${data.company}</td>
        <td>${data.contacts}</td>
        <td>${data.group.map(function(el) {
            return `<span class="table__tag me-2">${el}</span>`
        }).join("")}</td>
        <td>${data.projects}</td>
        <td>${data.summ}</td>
        <td>${data.paid}</td>
        <td>${data.debt}</td>
        <td>
            <div class="d-flex align-teims-center justify-content-center">
                <button type="button" class="btn btn_clean" onclick="event.stopPropagation(); onClientEdited(${data.id})" title="${editTitle()}">
                    <span class="table__icon table__icon_edit"></span>
                </button>
                <button type="button" class="btn btn_clean" onclick="event.stopPropagation(); onClientsRemoved(${data.id})" title="${deleteTitle()}">
                    <span class="table__icon table__icon_remove"></span>
                </button>
            </div>
        </td>
    </tr>`
}
// update form values from server
function updateClientsForm(data) {
    const form = $(".client-form-template").clone(true);
    form.removeClass("client-form-template d-none");
    // update inputs
    form.find('[name="company"]').val(data.company);
    form.find('[name="cars"]').val(data.allCars);
    form.find('[name="bill"]').val(data.bill);
    form.find('[name="payments"]').val(data.payments);
    form.find('[name="estimates"]').val(data.estimates);
    form.find('[name="expenses"]').val(data.expenses);
    form.find('[name="viber"]').val(data.viber);
    form.find('[name="telegram"]').val(data.telegram);
    form.find('[name="whatsapp"]').val(data.whatsapp);
    form.find('[name="web"]').val(data.web);
    // update files list
    let filesList = "";
    data.files.forEach(function(file) {
        filesList += createFileItem(file.id, file.title)
    });
    // console.log($(filesList));
    form.find(".files__list").html(filesList);
    return form;
}
// callback when client upload new file 
function clientFilesUploaded() {
    $(document).on("change", ".files__control", function(e) {
        const fileLabel =  $(this).parent();
        const index = fileLabel.attr("data-file-input") - 0; 
        const name = e.target.files[0].name;
        const input = createFileInput(index+1);
        const item = createFileItem(index, name, false);
        
        fileLabel.addClass("d-none").after(input); // hide input to create new input for next file
        $(this).closest(".files").find(".files__list").append(item); // add file name in list
    })
}
// ON CREATE BUTTON CLICKED
function onCLientAdd() {
    $('[data-mymodal-id="form-client"] .title').text(getLanguage() === "ru" ? "Добавить клиента" : "Add a client")
    const form = $(".client-form-template").clone(true);
    form.removeClass("client-form-template d-none");
    form[0].onsubmit = function(e) {
        e.preventDefault();
        const data = new FormData(this);
        onClientAddSubmited(data); // on client ADD submited
    };
    $('[data-mymodal-id="form-client"] .form').replaceWith(form)
    $('[data-mymodal-id="form-client"]').mymodal().open()

}
function onClientAddSubmited(data) {
    addBodyLoader();
    // some server request with data
    // if success get data and create new row
    const newTr = createClientRow(trDummyData);
    // then add to list
    $("#clients tbody").prepend(newTr)
    $('[data-mymodal-id="form-client"]').mymodal().close()
    removeBodyLoader();
    // or refresh a page
}
// ON EDIT BUTTON CLICKED
function onClientEdited(id) {
    $('[data-mymodal-id="form-client"] .title').text(getLanguage() === "ru" ? "Редактировать клиента" : "Edit a client")
    // get client's data from server
    // if request success update form data
    const updatedForm = updateClientsForm(clientDummyData);
    // set new submit function dependent to client's id
    updatedForm[0].onsubmit = function(e) {
        e.preventDefault();
        const data = new FormData(this);
        onClientEditSubmited(id, data); //on client EDIT submited
    };
    $('[data-mymodal-id="form-client"] .form').replaceWith(updatedForm)
    $('[data-mymodal-id="form-client"]').mymodal().open()
    // clear removed files list on form closed
    $(document).on("closed", '[data-mymodal-id="form-client"]', function() {
        filesToRemove = [];
    })
}
// on data submited
const trDummyData = {
    id: 2,
    company: "Компания",
    contacts: "Контактное лицо",
    group: ["VIP","Группа"],
    projects: 5,
    summ: "$1 670",
    paid: "$1 000",
    debt: "$670",
}
// ON CLIENT'S NEW INFO SUBMITED
function onClientEditSubmited(id, formData) {
    addBodyLoader();
    // some ajax with formData and id
    // if request successed
    // get row's data with response
    $('[data-clients-row="'+id+'"]').replaceWith(createClientRow(trDummyData))
    $('[data-mymodal-id="form-client"]').mymodal().close()
    // finally
    removeBodyLoader();
}
// ON REMOVE BUTTON CLICKED TO REMOVE CLIENT SHOW WARNING
function onClientsRemoved(id) {
    const modal = $('.mymodal_confirmation'); // get delete confiramation modal
    $(document).on("opening", modal, function() {
        const title = getLanguage() === "ru" ? `Вы уверены что хотите удалить ID${id}` : `Are you sure you want to delete ID${id}`;
        $(this).find(".confiramtion-title").text(title);
    });

    $(document).on("confirmation", modal, onClientsRemoveConfirmed.bind(this, id));

    $(document).on("closed", modal, function() {
        $(this).find(".confiramtion-title").text("")
        $(document).off("confirmation", modal, onClientsRemoveConfirmed);
    });

    modal.mymodal().open();
}
// ON CLICNT REMOVING ACCEPTED
function onClientsRemoveConfirmed(id) {
    if (isNaN(parseInt(id))) alert("Something went wrong")
    addBodyLoader()
    setTimeout(function() {
        const target = $('[data-clients-row="'+id+'"]')
        target.remove()
        removeBodyLoader()
    }, 2000)
}

$(function() {
    clientFilesUploaded()
})