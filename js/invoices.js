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
    $('[data-mymodal-id="add-invoices"]').mymodal().open() // open after form updated
    // onError alertNotice
    removeBodyLoader();
}

function calcTotal(price, quantity) { return price*quantity }

function changeTotal(table) {
    const summDivAll = table.find('[data-summ]')
    let summDivAllVal = 0
    // total
    const summDivTotal = table.closest("form").find('[data-summ-total]')
    
    summDivAll.each(function(idx, el) {
        summDivAllVal += $(el).data("summ")
    })

    summDivTotal.data("summ-total", summDivAllVal)
    summDivTotal.text(summDivAllVal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")+"$")
}

function calcOnTrChange(idx, el) {
    const quantity = $(el).find(".js-quantity")
    let quantityVal = 1;
    const price = $(el).find(".js-price")
    let priceVal = 0;
    // total
    const table = $(el).closest(".js-invoice-table")
    
    function changeSumm() {
        $(el).data("summ", calcTotal(priceVal, quantityVal))
        // summDiv.text(calcTotal(priceVal,quantityVal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")+"$")
    }
    
    function calculate() {
        changeSumm()
        changeTotal(table)
    }
    quantity.on("input", function(e) {
        quantityVal = $(this).val() - 0
        calculate()
    })
    // rewrite input, not working addEventListener bcs of inputmask
    price[0].oninput = function(e) {
        priceVal = $(this).val().replace(/[^\d.]/g, '') - 0
        calculate()
    }
    price[0].onchange = function(e) {
        priceVal = $(this).val().replace(/[^\d.]/g, '') - 0
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

    $(document).on("change", ".js-invoice-client", function(e) {
        const val = $(this).val();
        const textarea = $(".js-invoice-address")
        if (val === "")
            return textarea.val("")
        // get address
        textarea.val("Vasil Levski Nr.2 \n4100 Karlovo City, Bulgaria \nTax Nr: BG324119220 \nEmail: client@mail.com")
    })
})