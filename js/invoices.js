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

function calcVat(price, vat, quantity) { 
    return {
        noVat: price*(1-vat)*quantity-0,
        vat: price*vat*quantity-0
    }
}

function calcTotal(price, quantity) { return price*quantity }

function changeTotal(table) {
    const noVatDivAll = table.find('[data-no-vat]')
    let noVatDivAllVal = 0
    const vatDivAll = table.find('[data-vat]')
    let vatDivAllVal = 0
    const summDivAll = table.find('[data-summ]')
    let summDivAllVal = 0
    // total
    const noVatDivTotal = table.find('[data-no-vat-total]')
    const vatDivTotal = table.find('[data-vat-total]')
    const summDivTotal = table.find('[data-summ-total]')
    
    noVatDivAll.each(function(idx, el) {
        noVatDivAllVal += $(el).data("no-vat")
    })
    vatDivAll.each(function(idx, el) {
        vatDivAllVal += $(el).data("vat")
    })
    summDivAll.each(function(idx, el) {
        summDivAllVal += $(el).data("summ")
    })

    noVatDivTotal.data("no-vat-total", noVatDivAllVal);
    noVatDivTotal.text(noVatDivAllVal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")+"$")

    vatDivTotal.data("vat-total", vatDivAllVal)
    vatDivTotal.text(vatDivAllVal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")+"$")
    
    summDivTotal.data("summ-total", summDivAllVal)
    summDivTotal.text(summDivAllVal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")+"$")
}

function calcOnTrChange(idx, el) {
    const quantity = $(el).find(".js-quantity")
    let quantityVal = 1;
    const price = $(el).find(".js-price")
    let priceVal = 0;
    const vat = $(el).find(".js-vat")
    let vatVal = 0
    // row total
    const noVatDiv = $(el).find('[data-no-vat]')
    const vatDiv = $(el).find('[data-vat]')
    const summDiv = $(el).find('[data-summ]')
    // total
    const table = $(el).closest(".js-invoice-table")
    
    function changeNoVat() {
        noVatDiv.data("no-vat", calcVat(priceVal, vatVal, quantityVal).noVat)
        noVatDiv.text(calcVat(priceVal, vatVal, quantityVal).noVat.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")+"$")
    }
    
    function changeVat() {
        vatDiv.data("vat", calcVat(priceVal, vatVal, quantityVal).vat)
        vatDiv.text(calcVat(priceVal, vatVal, quantityVal).vat.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")+"$")
    }
    
    function changeSumm() {
        summDiv.data("summ", calcTotal(priceVal, quantityVal))
        summDiv.text(calcTotal(priceVal,quantityVal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")+"$")
    }
    
    function calculate() {
        changeNoVat()
        changeVat()
        changeSumm()
        changeTotal(table)
    }
    // rewrite input, not working addEventListener bcs of inputmask
    quantity[0].oninput = function(e) {
        quantityVal = $(this).val() - 0
        calculate()
    }
    price[0].oninput = function(e) {
        priceVal = $(this).val().replace(/[^\d.]/g, '') - 0
        calculate()
    }
    vat[0].oninput = function(e) {
        vatVal = ($(this).val().replace(/[^\d]/g, '') - 0)/100
        calculate()
    }
}

function calcInvoices() {
    const form = $(document).find(".invoice-form");
    const table = form.find("table");
    table.find("tbody tr").each(calcOnTrChange)
}

function addInvoiceRow() {
    $(document).on("click", ".js-invoice-table .add-btn", function() {
        const list = $(this).closest(".js-invoice-table").find("tbody");
        const inputs = list.find("input, select")
        
        for (let i = 0; i < inputs.length; i++) {
            if (!inputs[i].reportValidity()) {
                return;
            }
        }
        const tr = $(".invoice-tr-template").clone(true);

        tr.removeClass("invoice-tr-template")
        list.append(tr)
        calcOnTrChange(0, tr[0])
    })
}

function removeInvoiceRow() {
    $(document).on("click", ".js-invoice-table .remove-btn", function() {
        const table = $(this).closest("table")
        const tr = $(this).closest("tr");
        tr.remove()
        changeTotal(table)
    })
}

function getCheckedProjects() {
    const ww = $(window).width()
    if (ww < 992) {
        const inputs = $(".js-for-invoice-mob:checked").toArray().map(function(el) {
            return el.value
        })
        console.log($.unique(inputs));
        return inputs
    } else {
        const inputs = $(".js-for-invoice:checked").toArray().map(function(el) {
            return el.value
        })
        console.log($.unique(inputs));
        return inputs
    }
}

$(function() {
    calcInvoices()
    addInvoiceRow()
    removeInvoiceRow()

    $(document).on("click",".create-invoice", function(e) {
        const inputs = getCheckedProjects()
        if (!inputs.length)
            return alertNotice("Внимание","Выберите проект", "info", 5000)
        const modal = $('[data-mymodal-id="add-invoices"]');
        modal.mymodal().open()
    })
})