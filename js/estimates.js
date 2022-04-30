// estimates
const dummyEstimatesCar = {
    fl: "http://farm6.staticflickr.com/5614/15602332537_bae1aaccd8_b.jpg",
    fm: "",
    fr: "http://farm4.staticflickr.com/3864/14420515212_9999c800b4_m.jpg",
    lt: "http://farm6.staticflickr.com/5614/15602332537_bae1aaccd8_b.jpg",
    lb: "",
    rt: "http://farm4.staticflickr.com/3864/14420515212_9999c800b4_m.jpg",
    rb: "http://farm6.staticflickr.com/5614/15602332537_bae1aaccd8_b.jpg",
    bl: "",
    bm: "http://farm4.staticflickr.com/3864/14420515212_9999c800b4_m.jpg",
    br: "http://farm6.staticflickr.com/5614/15602332537_bae1aaccd8_b.jpg",
}

function onEstimatesUpdate(data) {
    for (const k in data) {
        const input = $(`[name='damage-${k}']`);
        const estimatesItem = input.closest(".estimates__item");
        const imgOrigin = estimatesItem.find(".img-origin")
        const fancyItem = estimatesItem.find('[data-fancybox]');

        imgOrigin.css("background-image", `url(${data[k]})`)
        fancyItem.attr({
            "href": data[k] ? data[k] : "",
            "data-fancybox": data[k] ? "estimates" : ""
        })

        if (data[k]) {
            estimatesItem.addClass("has-image")
        } else {
            estimatesItem.removeClass("has-image")
        }
    }
}

function onEstimatesShowed(id) {
    // get data with id or we can find alternative way
    addBodyLoader();
    // if success
    onEstimatesUpdate(dummyEstimatesCar)
    $('[data-mymodal-id="estimates-damage"]').mymodal().open()
    // error alertNotice
    removeBodyLoader();
}

function onEstimatesStatusChanged(event, id) {
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

function onEstimatesFileSelected(event) {
    const input = $(event.target);
    const estimatesItem = input.closest(".estimates__item");
    const fancyItem = estimatesItem.find('[data-fancybox]');
    const img = estimatesItem.find(".img-origin")
    // file
    const selectedFile = event.target.files[0];
    const data = new FormData()
    data.append("image", selectedFile);
    
    function onSuccess(imageURL) {
        img.css("background-image", "url('"+imageURL+"')");
        fancyItem.attr({
            "href": imageURL,
            "data-fancybox": "estimates" // add to carousel/gallery
        })
        estimatesItem.addClass("has-image")
    }
    addBodyLoader()
    // server request with data like FormData
    // if success
    onSuccess("https://lipsum.app/id/68/1536x768")
    // on error alertNotice(errorTitle(), errorText(), "danger") 
    removeBodyLoader()
}

function removeEstimatesImage(event) {
    const btn = $(event.target);
    const estimatesItem = btn.closest(".estimates__item");
    const fancyItem = estimatesItem.find('[data-fancybox]');
    const input = estimatesItem.find(".estimates__input")
    const img = estimatesItem.find(".img-origin")
    const inputName = input.attr("name"); // get input name for server request
    function onSuccess() {
        img.css("background-image", "")
        
        fancyItem.attr({
            "href": "",
            "data-fancybox": ""
        })
        console.log(input);
        estimatesItem.removeClass("has-image")
        input.val("")
    }
    addBodyLoader();
    // server request to delete image with inputName
    // if success
    onSuccess()
    // if Error
    // alertNotice(errorTitle(), errorText(), "danger")
    // finally
    removeBodyLoader()
}

function onEstimatesEdited(id) {
    console.log("edit estimates");
}
// create mob estimates
const dummyEstimates = {
    id: 1,
    project: "LAND CRUISER PRADO",
    vin: "33-443-222233",
    number: "AA333432244",
    master: "Иван Григорьев",
    client: "Сергей Антонов",
    sum: "10 000$",
    created: "19.10.2022"
}

function createMobEstimates(data, additionalClass) {
    return `<table class="table table_card ${additionalClass}">
        <tbody>
            <tr>
                <th>ID</th>
                <td>${data.id}</td>
            </tr>
            <tr>
                <th>Марка машины</th>
                <td>${data.project}</td>
            </tr>
            <tr>
                <th>VIN-код</th>
                <td>${data.vin}</td>
            </tr>
            <tr>
                <th>Номер машины</th>
                <td>${data.number}</td>
            </tr>
            <tr>
                <th>Тенхник</th>
                <td>${data.master}</td>
            </tr>
            <tr>
                <th>Заказчик</th>
                <td>${data.client}</td>
            </tr>
            <tr>
                <th>Цена</th>
                <td>${data.sum}</td>
            </tr>
            <tr>
                <th>Дата создания</th>
                <td>${data.created}</td>
            </tr>
            <tr>
                <th>Просмотр</th>
                <td>
                    <button type="button" class="btn btn_clean d-block" onclick="onEstimatesShowed(${data.id})">
                        <span class="table__icon table__icon_show"></span>
                    </button>
                </td>
            </tr>
            <tr>
                <th>Функции</th>
                <td>
                    <button type="button" class="btn btn_clean d-block" onclick="onEstimatesEdited(${data.id})">
                        <span class="table__icon table__icon_edit_red_fill"></span>
                    </button>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr class="text-center">
                <td colspan="2">
                    <div class="radio__list radio__list_table">
                        <label class="input input_radio">
                            <input type="radio" class="input__control" name="estimates[${data.id}]" checked="" value="0" onchange="onEstimatesStatusChanged(event, ${data.id})"> 
                            <span class="input__label input__label_green">${getLanguage() === "ru" ? "Оценено" : "Rated"}</span>
                        </label>
                        <label class="input input_radio">
                            <input type="radio" class="input__control" name="estimates[${data.id}]" value="1" onchange="onEstimatesStatusChanged(event, ${data.id})">
                            <span class="input__label input__label_green">${getLanguage() === "ru" ? "Отремонтировано" : "Fixed"}</span>
                        </label>
                        <input type="hidden" class="radio__prev" value="0">
                    </div>
                </td>
            </tr>
        </tfoot>
    </table>`
}
// ADD ESTIMATES
function addEstimates(event) {
    event.preventDefault()
    console.log("wtf");
}

function checkForm(n) {
    const form = $("[data-form-part='"+n+"']")
    for (let i = 0; i < form.find("input").length; i++) {
        if (!form.find("input")[i].reportValidity()) {
            return
        }
    }
}

$(function() {
    $(document).on('change', ".estimates__item input", onEstimatesFileSelected)
    $(document).on("click", ".estimates__item .btn_remove", removeEstimatesImage)

    $('[data-mymodal-id="add-estimates"]').on("closed", function(e) {
        console.log(e.reason);
    })
})