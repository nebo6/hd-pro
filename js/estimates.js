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

$(function() {
    $(document).on('change', ".estimates__item input", onEstimatesFileSelected)
    $(document).on("click", ".estimates__item .btn_remove", removeEstimatesImage)
})