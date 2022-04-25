function getLanguage() {
    return document.documentElement.lang
}
function addBodyLoader() {
    $("body").addClass("loading");
}
function removeBodyLoader() {
    $("body").removeClass("loading");
}
function num_word(value, words){  
	value = Math.abs(value) % 100; 
	var num = value % 10;
	if(value > 10 && value < 20) return words[2]; 
	if(num > 1 && num < 5) return words[1];
	if(num == 1) return words[0]; 
	return words[2];
}
// common locales
function editTitle() { return getLanguage() === "ru" ? "Редактировать" : "Edit" }
function deleteTitle() { return getLanguage() === "ru" ? "Удалить" : "Delete" }
function uploadFileTitle() { return getLanguage() === "ru" ? "Загрузите файл" : "Upload File" }
function errorTitle() { return getLanguage() === "ru" ? "Ошибка" : "Error" }
function errorDescription() { return getLanguage() === "ru" ? "Произошла ошибка. Попробуйте снова" : "An error has occurred. Try it again later" }
// init simple accordio
function initAccordion() {
    const accordion = $(".js-accordion");

    accordion.on("click", ".js-accordion-head", function() {
        $(this).toggleClass("active");
        const body = $(this).siblings(".js-accordion-body");
        body.stop().slideToggle(250, function() {
            if ($(this).closest(".sidebar").length) {
                $(this).closest(".sidebar").toggleClass("active")
            }
        })
    })
}
// init simple dropdown
function initDropdown() {
    $(window).on("click", function() {
        $("[data-dropdown]").removeClass("dropdown_active")
    })
    
    $(document).on("click", "[data-dropdown-target]", function(e) {
        e.stopPropagation();
        const target = $(this).data("dropdown-target");
        const dropdown = $("[data-dropdown=" + target + "]")
        dropdown.toggleClass("dropdown_active");
        $("[data-dropdown]").not(dropdown).removeClass("dropdown_active")
    })
}
// return radios prev value on request error
function getRadioPrev(event) {
    const _target = event.target
    const list = $(_target).closest(".radio__list")
    const prevInput = list.find(".radio__prev")
    const prevValue = prevInput.val()

    return {
        input: prevInput,
        value: prevValue,
        radio: list.find('[value="'+prevValue+'"]')
    }
}
// alert
function closeAlert(alert, callback) {
    alert.slideUp(200, function() {
        $(this).remove()
        if (typeof callback === "function") callback()
    })
}
// type: "success" | "danger" | "info" | "deadline"
function alertNotice(title, text, type, time) {
    time = time === undefined ? 5000 : time
    const alert = $(".alert.template").clone().removeClass("template");
    const btn = alert.find(".alert__clsoe");
    let timeout;
    if (time) {
        timeout = setTimeout(function() {
            closeAlert(alert, function() { clearTimeout(timeout) })
        }, time)
    }
    btn.on("click", function() {
        closeAlert(alert, function() { clearTimeout(timeout) })
    })
    alert.find(".alert__progress").css("animation-duration", time+"ms")
    alert.find(".alert__title").text(title);
    alert.find(".alert__description").text(text);
    alert.addClass(type);
    alert.appendTo(".alert__list").slideDown(200)
}

function formattedNumber(number) {
    return ("0" + number).slice(-2)
}

function initMultiselect() {
    $(document).on("click", ".multiselect", function(e) { e.stopPropagation() })
    $(document).on("click", ".multiselect__inner", function(e) {
        e.stopPropagation();
        const _this = this;
        $(_this).siblings(".multiselect__options").slideToggle(200, function() {
            $(_this).parent().toggleClass("active")
        });
    });
    $(document).on("click", ".multiselect__header", function(e) {
        e.stopPropagation();
        const _this = this;
        const inputs = $(_this).parent().find("input");
        if (inputs.toArray().every(function(el) { return $(el).prop("checked") })) {
            inputs.prop("checked", false)
            inputs.change();
        } else {
            inputs.prop("checked", true)
            inputs.change();
        }
    });
    $(document).on("change", ".multiselect__options input", function(e) {
        const inputs = $(this).closest(".multiselect").find('input[type="checkbox"]');
        const input = $(this).closest(".multiselect").find(".multiselect__inner");
        const checkedLength = $(this).closest(".multiselect").find('input[type="checkbox"]:checked').length
        console.log(checkedLength);
        if (checkedLength === 0)
            return input.addClass("empty").text(input.data("placeholder"))
        if (checkedLength === 1 ) {
            const checkedLabelText = inputs.filter(function(idx, el) { return $(el).is(":checked") }).eq(0).siblings(".input__label").text()
            return input.removeClass("empty").text(checkedLabelText)
        }

        const title = getLanguage() === "ru" ? num_word(checkedLength, [`Выбран ${checkedLength} сотрудник`, `Выбрано ${checkedLength} сотрудника`, `Выбрано ${checkedLength} сотрудников`]) : num_word(checkedLength, [`Checked ${checkedLength} employee`, `Checked ${checkedLength} employees`, `Checked ${checkedLength} employees`])

        return input.text(title)
    })
    $(window).on("click", function() {
        $('.multiselect__options').slideUp(200, function() {
            $(this).closest(".multiselect.active").removeClass("active")
        });
    })
}

$(function() {
    initAccordion();
    initDropdown();

    $.datepicker.regional.ru = {
        closeText: "Закрыть",
        prevText: "&#x3C;Пред",
        nextText: "След&#x3E;",
        currentText: "Сегодня",
        monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь",
        "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
        monthNamesShort: [ "Янв","Фев","Мар","Апр","Май","Июн",
        "Июл","Авг","Сен","Окт","Ноя","Дек" ],
        dayNames: [ "воскресенье","понедельник","вторник","среда","четверг","пятница","суббота" ],
        dayNamesShort: [ "вск","пнд","втр","срд","чтв","птн","сбт" ],
        dayNamesMin: [ "Вс","Пн","Вт","Ср","Чт","Пт","Сб" ],
        weekHeader: "Нед",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: "" };
    
    $.datepicker.setDefaults( $.datepicker.regional[ getLanguage() ] );
    initMultiselect()
    // autocomplete
    let cache = {};
    $(".js-search").autocomplete({
        minLength: 2,
        // source: function(request, response) {
        //     const term = request.term
        //     console.log(request, response);
        //     if (term in cache) {
        //         response(cache[term])
        //         return
        //     }

        //     $.getJSON("https://jqueryui.com/resources/demos/autocomplete/search.php", request, function(data, status, xhr) {
        //         cache[ term ] = data;
        //         response( data );
        //     })
        // },
        source: function(request, response) {
            console.log("source", request);
            response([{
                value: 0,
                title: "Заголовок",
                label: "Заголовок",
                description: "Описание чего-либо Описание чего-либо Описание чего-либо Описание чего-либо Описание чего-либо Описание чего-либо",
                img: undefined,
                href: "#"
            },{
                value: 1,
                title: "Заголовок",
                label: "Заголовок",
                description: "Описание чего-либо",
                img: "/img/user.jpg",
                href: "#"
            }])
        },
        
    }).data("ui-autocomplete")._renderItem = function( ul, item ) {
        const li = `<li>
            <a href="${item.href}" class="d-flex flex-wrap search-item align-items-center">
                ${item.img ? `<div class="col-auto pe-2">
                    <div class="avatar avatar_small" style="background-image: url(${item.img})"></div>
                </div>` : ""}
                <div class="col">
                    <h4 class="search-title">${item.title}</h4>
                    <p class="search-description">${item.description}</p>
                </div>
            </a>
        </li>`
        
        return $(li).appendTo(ul)
    }
})