// TASK LIST SORTING
function initDragDropSortable() {
    let position_updated = false
    
    let scrollX = 0;
    let scrollY = 0;
    const $scrollable = $(".task-scrollable");
    
    $('.column__list').sortable({
        connectWith: ".column__list",
        placeholder: "column__placeholder",
        // forcePlaceholderSize: true,
        cancel: "select",
        scroll:false,
        delay: 150,
        // distance: 10,
        sort: function( event, ui ) {
            if (ui.placeholder) {
                const left = parseInt(ui.placeholder.parent().offset().left)
                if (scrollX !== left) {
                    console.log("sort x");
                    scrollX = left;
                    $scrollable.stop().animate({
                        scrollLeft: left,
                    }, 300)
                }
                const top = parseInt(ui.placeholder.offset().top - ui.placeholder.height() - 20)
                if (scrollY !== top) {
                    console.log("sort y");
                    scrollY = top;
                    ui.placeholder.parent().stop().animate({
                        scrollTop: top
                    }, 300)
                }
            }
        },
        update: function(e, ui) {
            console.log("update");
            position_updated = !ui.sender
        },
        stop: function(event, ui) {
            if (position_updated) {
                const item = ui.item;
                const parent = item.parent();
                const task = parent.attr("data-task"); // task column name
                const sortedList = parent.sortable("toArray", {attribute: "data-task-id"}); // list of sorted elements in task
                console.log(task, sortedList);
                /*
                    addBodyLoader();
                    request to server
                    error: function() {
                        parent.sortable("cancel")
                    },
                    finally: function() {
                        removeBodyLoader();
                    }
                */
                position_updated = false;
            }
        },
        // This event is triggered when an item from a connected sortable list has been dropped into another list. The latter is the event target.
        receive: function(event, ui) {
            const item = ui.item;
            const parent = item.parent();
            const sender = item.sender;
            const task = parent.attr("data-task"); // task column name
            const sortedList = parent.sortable("toArray", {attribute: "data-task-id"}); // list of sorted elements in task
            console.log(task, sortedList);
            /*
                addBodyLoader();
                request to server
                error: function() {
                    sender.sortable("cancel")
                },
                finally: function() {
                    removeBodyLoader();
                }
            */
        }
    })
    // $('.column__list').disableSelection()
}

const dummyTask = {
    id: 100,
    date: "15.09.2022",
    deadline: "15.10.2022",
    title: "Задача ID100",
    executer: 0,
    message: ""
}
function addTask(task) {
    // OPEN MODAL TO CREATE TASK
    // IF FORM SUBMITED ADD TASK
    // ELSE SHOW NOTICE
    console.log(task);
    $('[data-mymodal-id="add-task"]').mymodal().open()
    const form = $(".js-add-task-from")
    form[0].onsubmit = function(event) {
        event.preventDefault();
        const data = $(this).serialize();
        addBodyLoader();
        // server if submit
        $('[data-mymodal-id="add-task"]').mymodal().close()
        this.reset(); // reset form after submit
        addTaskToList(task, createTask(dummyTask))
        // error
        // finally
        removeBodyLoader()
    }
}

function removeTask(id) {
    addBodyLoader();
    // request to remove
    $("[data-task-id='"+id+"']").remove()
    // else notice
    removeBodyLoader();
}

function editTask(id) {
    console.log("edit task", id);
    function onSuccess(data) {
        const form = $(".js-edit-task-form");
        form.find('[name="theme"]').val(data.title)
        form.find('[name="deadline"]').val(data.deadline)
        form.find('[name="message"]').val(data.message)
        console.log(form, form.find('[name="executer"]'), data.executer);
        form.find('[name="executor"]').val(data.executer)
        form[0].onsubmit = function(event) {
            event.preventDefault();
            const formData = $(this).serialize();
            addBodyLoader();
            // server request with formData
            // onsubmit get data from response
            const card = createTask({ ...data, id }) // { ...data, id } with server reposponse data
            $('[data-task-id="'+id+'"]').replaceWith(card)
            $('[data-mymodal-id="edit-task"]').mymodal().close();
            this.reset(); // reset form after submit
            // on error notice
            // finally
            removeBodyLoader();
        }
        $('[data-mymodal-id="edit-task"]').mymodal().open();
    }
    addBodyLoader();
    // server request with id to get data
    onSuccess(dummyTask)
    // an error alert
    removeBodyLoader();
}

function createTask(data) {
    const card = $(".task-template").clone();
    
    card.removeClass("task-template").attr("data-task-id", data.id);
    card.find("[data-t-id]").text(`ID: ${data.id}`);
    card.find("[data-t-date]").text(data.date);
    card.find("[data-t-title]").text(data.title);
    card.find("[data-t-deadline]").text(data.deadline);
    
    const select = card.find("select");
    select.val(data.executer)

    return card
}

function addTaskToList(task, card) {
    const list = $("[data-task='"+task+"']");
    if (list.length) {
        list.append(card)
        if (list.hasClass("ui-sortable")) list.sortable("refresh")
    }
}

function changeTaskExecutor() {
    let prev = null
    $(document).on("focus", ".js-task-executer-select", function() {
        prev = $(this).val();
    }).on("change", ".js-task-executer-select", function() {
        const val = $(this).val();
        addBodyLoader();
        // server request
        // if error
        // $(this).val(prev)
        removeBodyLoader();
    }).on("blur", ".js-task-executer-select", function() {
        prev = null
    })
}

$(function() {
    initDragDropSortable()
    $(document).on('click', '.js-remove-task', function() {
        const id = $(this).closest("[data-task-id]").attr("data-task-id")
        removeTask(id)
    })
    $(document).on('click', '.js-edit-task', function() {
        const id = $(this).closest("[data-task-id]").attr("data-task-id")
        editTask(id)
    })
    changeTaskExecutor()
})