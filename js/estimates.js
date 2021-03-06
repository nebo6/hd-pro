// estimates
const dummyEstimatesCar = {
    ["left-front-fender"]: "http://farm6.staticflickr.com/5614/15602332537_bae1aaccd8_b.jpg",
    hood: "",
    roof: "http://farm4.staticflickr.com/3864/14420515212_9999c800b4_m.jpg",
    ["rigth-front-fender"]: "http://farm6.staticflickr.com/5614/15602332537_bae1aaccd8_b.jpg",
    ["left-front-door"]: "",
    ["right-front-door"]: "http://farm4.staticflickr.com/3864/14420515212_9999c800b4_m.jpg",
    ["left-back-door"]: "http://farm4.staticflickr.com/3864/14420515212_9999c800b4_m.jpg",
    ["rigth-back-door"]: "http://farm6.staticflickr.com/5614/15602332537_bae1aaccd8_b.jpg",
    ["left-back-fender"]: "",
    ["right-back-fender"]: "",
    ["left-rack"]: "",
    trunk: "http://farm4.staticflickr.com/3864/14420515212_9999c800b4_m.jpg",
    ["right-rack"]: "http://farm6.staticflickr.com/5614/15602332537_bae1aaccd8_b.jpg",
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
    console.log("edit estimates", id);
    // should be edit-estimates
    $("[data-mymodal-id='add-estimates']").mymodal().open()
}
// create mob estimates
const dummyEstimates = {
    id: 1,
    project: "LAND CRUISER PRADO",
    vin: "33-443-222233",
    number: "AA333432244",
    master: "???????? ??????????????????",
    client: "???????????? ??????????????",
    sum: "10 000$",
    created: "19.10.2022"
}

function createMobEstimates(data) {
    return `<table class="table table_card">
        <tbody>
            <tr>
                <th>ID</th>
                <td>${data.id}</td>
            </tr>
            <tr>
                <th>?????????? ????????????</th>
                <td>${data.project}</td>
            </tr>
            <tr>
                <th>VIN-??????</th>
                <td>${data.vin}</td>
            </tr>
            <tr>
                <th>?????????? ????????????</th>
                <td>${data.number}</td>
            </tr>
            <tr>
                <th>??????????????</th>
                <td>${data.master}</td>
            </tr>
            <tr>
                <th>????????????????</th>
                <td>${data.client}</td>
            </tr>
            <tr>
                <th>????????</th>
                <td>${data.sum}</td>
            </tr>
            <tr>
                <th>???????? ????????????????</th>
                <td>${data.created}</td>
            </tr>
            <tr>
                <th>????????????????</th>
                <td>
                    <button type="button" class="btn btn_clean d-block" onclick="event.stopPropagation();onEstimatesShowed(${data.id})">
                        <span class="table__icon table__icon_show"></span>
                    </button>
                </td>
            </tr>
            <tr>
                <th>??????????????</th>
                <td>
                    <button type="button" class="btn btn_clean d-block" onclick="event.stopPropagation();onEstimatesEdited(${data.id})">
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
                            <span class="input__label input__label_green">${getLanguage() === "ru" ? "??????????????" : "Rated"}</span>
                        </label>
                        <label class="input input_radio">
                            <input type="radio" class="input__control" name="estimates[${data.id}]" value="1" onchange="onEstimatesStatusChanged(event, ${data.id})">
                            <span class="input__label input__label_green">${getLanguage() === "ru" ? "??????????????????????????????" : "Fixed"}</span>
                        </label>
                        <input type="hidden" class="radio__prev" value="0">
                    </div>
                </td>
            </tr>
        </tfoot>
    </table>`
}

function createMobEstimatesTech(data) {
    return `<table class="table table_card table_layout_auto">
        <tbody>
            <tr>
                <th>?????????? ????????????</th>
                <td class="table-word-wrap">${data.project}</td>
                <th>?????????? ????????????</th>
                <td>${data.number}</td>
                <th>VIN-??????</th>
                <td>${data.vin}</td>
            </tr>
            <tr>
                <th>??????????????</th>
                <td>${data.master}</td>
                <th>????????????????</th>
                <td>${data.client}</td>
                <th>????????</th>
                <td>${data.sum}</td>
            </tr>
            <tr>
                <th>???????? ????????????????</th>
                <td>${data.created}</td>
                <th>????????????????</th>
                <td>
                    <div class="d-flex">
                        <div class="col-auto px-1">
                            <button type="button" class="btn btn_clean d-block" onclick="event.stopPropagation();onEstimatesShowed(${data.id})">
                                <span class="table__icon table__icon_show"></span>
                            </button>
                        </div>
                        <div class="col-auto px-1">
                            <button type="button" class="btn btn_clean d-block" onclick="event.stopPropagation();onEstimatesEdited(${data.id})">
                                <span class="table__icon table__icon_edit_red_fill"></span>
                            </button>
                        </div>
                    </div>
                </td>
                <td colspan="2">
                    <div class="radio__list radio__list_table">
                        <label class="input input_radio">
                            <input type="radio" class="input__control" name="estimates[${data.id}]" checked="" value="0" onchange="onEstimatesStatusChanged(event, ${data.id})"> 
                            <span class="input__label input__label_green">${getLanguage() === "ru" ? "??????????????" : "Rated"}</span>
                        </label>
                        <label class="input input_radio">
                            <input type="radio" class="input__control" name="estimates[${data.id}]" value="1" onchange="onEstimatesStatusChanged(event, ${data.id})">
                            <span class="input__label input__label_green">${getLanguage() === "ru" ? "??????????????????????????????" : "Fixed"}</span>
                        </label>
                        <input type="hidden" class="radio__prev" value="0">
                    </div>
                </td>
            </tr>
        </tbody>
    </table>`
}

// ADD ESTIMATES
function addEstimates(e) {
    e.preventDefault();
    const data = new FormData(e.target)
    console.log(data);
}

function estimatesNext(page) {
    const wrapper = $("[data-estimates-slider='"+page+"']")
    for (let i = 0; i < wrapper.find("input, select").length; i++) {
        if (!wrapper.find("input, select")[i].reportValidity()) {
            return
        }
    }

    if (page-0 === 4) {
        const name = $(".js-estimates-type:checked").val() === "0" ? $(".js-estimates-name option:selected")[0].label : $(".js-owner-name").val()
        const date = $(".js-estimates-date").val()
        const vin = $(".js-estimates-vin").val()
        const pnr = $(".js-estimates-pnr").val()
        const img = $(".js-estimate-img").css("background-image")
        // undefined method of calculation
        const awTotal = 55
        const priceTotal = "2550 $"

        $("[data-e-name]").text(name)
        $("[data-e-date]").text(date)
        $("[data-e-vin]").text(vin)
        $("[data-e-pnr]").text(pnr)
        $("[data-e-aw-total]").text(awTotal)
        $("[data-e-price-total]").text(priceTotal)

        if (img !== "none")
            $("[data-e-img]").css("background-image", img)
    }
    
    $("[data-estimates-slider='"+page+"']").hide();
    $("[data-estimates-slider='"+(page-0+1)+"']").fadeIn();
}

function estimatesBack(event) {
    const page = $(event.target).closest("[data-estimates-slider]").data("estimates-slider")
    $("[data-estimates-slider='"+page+"']").hide();
    $("[data-estimates-slider='"+(page-1)+"']").fadeIn();
}

function estimatesType() {
    $(document).on("change", ".js-estimates-type", function() {
        const v = $(this).val()
        const clientsWrapper = $("[data-estimates-client='0']")
        const ownerWrapper = $("[data-estimates-client='1']")

        if (v === "0") {
            // clients
            clientsWrapper.find(".select").removeClass("disabled")
            clientsWrapper.find(".select__control").prop("disabled", false)
            // owners
            ownerWrapper.find(".estimates-temp").addClass("disabled")
            ownerWrapper.find(".estimates-owner input, .estimates-owner select").prop("disabled", true)
            ownerWrapper.find(".estimates-owner").slideUp()
        } else {
            // clients
            clientsWrapper.find(".select").addClass("disabled")
            clientsWrapper.find(".select__control").prop("disabled", true)
            // owners
            ownerWrapper.find(".estimates-temp").removeClass("disabled")
            ownerWrapper.find(".estimates-owner input, .estimates-owner select").prop("disabled", false)
            ownerWrapper.find(".estimates-owner").slideDown()
        }
    })
}
// ESTIMATES DETAIL
const dummyDetails = {
    estimates: dummyEstimates,
    damage: dummyEstimatesCar,

}

function estimatesDetail(id) {
    console.log("get data with id", id);
    // getData(id)

    $('[data-mymodal-id="detail-estimates"]').mymodal().open()
}

$(function() {
    $(document).on('change', ".estimates__item input", onEstimatesFileSelected)
    $(document).on("click", ".estimates__item .btn_remove", removeEstimatesImage)
    estimatesType()
    $(document).on("click", ".js-estimates-back", estimatesBack)
    $('.add-estimates-form').on("submit", addEstimates)
    $(document).on("opening", ".estimates-modal", function() {
        $("[data-estimates-slider]").hide()
        $("[data-estimates-slider='0']").show()
        $('.add-estimates-form')[0].reset()
    })
    // ESTIMATES DETAIL
    $(document).on("closing", '[data-mymodal-id="estimates-detail-damage"], [data-mymodal-id="estimates-detail-service"], [data-mymodal-id="estimates-detail-additional-service"]', function() {
        $('[data-mymodal-id="detail-estimates"]').mymodal().open()
    })
    $(".js-estimates-date").on("input change", function(e) {
        const date = $(this).val();
        console.log(date);
        const isValid = Inputmask.isValid(date, { alias: "datetime", inputFormat: "dd.mm.yyyy"});
        console.log("input", isValid, $(this));
        if (isValid) {
            const unformattedDate = Inputmask.unmask($(this).val(), { alias: "datetime", inputFormat: "dd.mm.yyyy", outputFormat: "mm.dd.yyyy"});
            const weekNumber = getWeekNumber(new Date(unformattedDate))
            $(this).closest("form").find(".js-estimates-week").val(weekNumber[1])
        }
    })
})