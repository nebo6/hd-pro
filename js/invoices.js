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

function calcInvoices() {
    const form = $(".invoice-form");
    const table = form.find("table");
    table.find("tbody tr").each(function(idx, el) {
        const quantity = $(el).find(".js-quantity")
        let quantityVal = 1;
        const price = $(el).find(".js-price")
        let priceVal = 0;
        const vat = $(el).find(".js-vat")
        let vatVal = 0
        const noVatDiv = $(el).find('[data-no-vat]')
        const vatDiv = $(el).find('[data-vat]')
        const summDiv = $(el).find('[data-summ]')
        
        function changeNoVat() {
            noVatDiv.data("no-vat", calcVat(priceVal, vatVal, quantityVal).noVat)
            noVatDiv.text(calcVat(priceVal, vatVal, quantityVal).noVat.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")+"$")
        }
        
        function changeVat() {
            vatDiv.data("no-vat", calcVat(priceVal, vatVal, quantityVal).vat)
            vatDiv.text(calcVat(priceVal, vatVal, quantityVal).vat.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")+"$")
        }
        
        function changeSumm() {
            summDiv.data("summ", calcTotal(priceVal,quantityVal))
            summDiv.text(calcTotal(priceVal,quantityVal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")+"$")
        }
        
        function calculate() {
            changeNoVat()
            changeVat()
            changeSumm()
        }
        
        quantity.on("input", function(e) {
            quantityVal = $(this).val() - 0
            calculate()
        })
        price.on("input", function(e) {
            priceVal = $(this).val().replace(/[^\d.]/g, '') - 0
            calculate()
        })
        vat.on("input", function(e) {
            vatVal = ($(this).val().replace(/[^\d]/g, '') - 0)/100
            calculate()
        })

    })
}

$(function() {
    calcInvoices()
})