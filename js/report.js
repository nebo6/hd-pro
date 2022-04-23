// EXPENSES REPORT
function onExpensesRemoveConfirmed(id) {
    if (isNaN(parseInt(id))) alert("Something went wrong")
    addBodyLoader()
    setTimeout(function() {
        const target = $('[data-expenses-row="'+id+'"]')
        target.remove()
        removeBodyLoader()
    }, 2000)
}

function onRemoveExpenses(id) {
    const modal = $('.mymodal_confirmation'); // get delete confiramation modal
    $(document).on("opening", modal, function() {
        const title = getLanguage() === "ru" ? `Вы уверены, что хотите удалить отчет о расходах ID ${id}?` : `Are you sure you want to delete a expenses report ID${id}?`
        $(this).find(".confiramtion-title").text(title);
    });
    $(document).on("confirmation", modal, onExpensesRemoveConfirmed.bind(this, id));
    $(document).on("closed", modal, function() {
        $(this).find(".confiramtion-title").text("")
        $(document).off("confirmation", onExpensesRemoveConfirmed);
    });

    modal.mymodal().open();
}

const dummyExpenses = {
    date: "22.11.2022",
    client: 0,
    employee: 0,
    period_start: "22.11.2022",
    period_end: "23.11.2022",
    category: 0,
    description: "Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст",
    summ: "21 500$"
}

function updateExpensesForm(data, id) {
    const form = $(".js-expenses-form").clone(true)
    form.find('[name="date"]').val(data.date)
    form.find('[name="client"]').val(data.client)
    form.find('[name="employee"]').val(data.employee)
    form.find('[name="period_start"]').val(data.period_start)
    form.find('[name="period_end"]').val(data.period_end)
    form.find('[name="category"]').val(data.category)
    form.find('[name="description"]').val(data.description)
    form.find('[name="summ"]').val(data.summ)
    form[0].onsubmit = function(e) {
        e.preventDefault()
        const data = $(e.target).serialize();
        addBodyLoader();
        // server id
        // submit 
        // error
        // finally
        removeBodyLoader()
        $('[data-mymodal-id="expenses-edit"]').mymodal().close()
    }
    $(".js-expenses-form").replaceWith(form)
}

function onEditExpenses(id) {
    addBodyLoader()
    // server to get row's data
    // success
    updateExpensesForm(dummyExpenses, id);
    $('[data-mymodal-id="expenses-edit"]').mymodal().open()
    // error
    // finally
    removeBodyLoader()
}

// INCOME REPORT | DUPLICATED EXPENSES
function onIncomeRemoveConfirmed(id) {
    if (isNaN(parseInt(id))) alert("Something went wrong")
    addBodyLoader()
    setTimeout(function() {
        const target = $('[data-income-row="'+id+'"]')
        target.remove()
        removeBodyLoader()
    }, 2000)
}

function onRemoveIncome(id) {
    const modal = $('.mymodal_confirmation'); // get delete confiramation modal
    $(document).on("opening", modal, function() {
        const title = getLanguage() === "ru" ? `Вы уверены, что хотите удалить отчет о доходах ID ${id}?` : `Are you sure you want to delete a income report ID${id}?`
        $(this).find(".confiramtion-title").text(title);
    });
    $(document).on("confirmation", modal, onIncomeRemoveConfirmed.bind(this, id));
    $(document).on("closed", modal, function() {
        $(this).find(".confiramtion-title").text("")
        $(document).off("confirmation", onIncomeRemoveConfirmed);
    });

    modal.mymodal().open();
}

function updateIncomeForm(data, id) {
    const form = $(".js-income-form").clone(true)
    form.find('[name="date"]').val(data.date)
    form.find('[name="client"]').val(data.client)
    form.find('[name="employee"]').val(data.employee)
    form.find('[name="period_start"]').val(data.period_start)
    form.find('[name="period_end"]').val(data.period_end)
    form.find('[name="category"]').val(data.category)
    form.find('[name="description"]').val(data.description)
    form.find('[name="summ"]').val(data.summ)
    form[0].onsubmit = function(e) {
        e.preventDefault()
        const data = $(e.target).serialize();
        addBodyLoader();
        // server id
        // submit 
        // error
        // finally
        removeBodyLoader()
        $('[data-mymodal-id="income-edit"]').mymodal().close()
    }
    $(".js-income-form").replaceWith(form)
}

function onEditIncome(id) {
    addBodyLoader()
    // server to get row's data
    // success
    updateIncomeForm(dummyExpenses, id);
    $('[data-mymodal-id="income-edit"]').mymodal().open()
    // error
    // finally
    removeBodyLoader()
}

function onWeekReportStatusChanged(event, id) {
    const prev = getRadioPrev(event)
    console.log("#", id, "estimated status changed to", event.target.value);
    prev.input.val(event.target.value)
    /* 
        if reauqest will fail
        then change value again to prev
        prev.radio.prop("checked", true)
        else change prevInput value to checked
        prev.input.val(event.target.value)
    */
}

$(function() {
    $(document).on("click", ".js-remove-expenses-report", function(e) {
        const id = $(this).closest("[data-expenses-row]").data("expenses-row");
        onRemoveExpenses(id)
    })
    $(document).on("click", ".js-edit-expenses-report", function() {
        const id = $(this).closest("[data-expenses-row]").data("expenses-row");
        onEditExpenses(id)
    })
    // copies
    $(document).on("click", ".js-remove-income-report", function(e) {
        const id = $(this).closest("[data-income-row]").data("income-row");
        onRemoveIncome(id)
    })
    $(document).on("click", ".js-edit-income-report", function() {
        const id = $(this).closest("[data-income-row]").data("income-row");
        onEditIncome(id)
    })
})
