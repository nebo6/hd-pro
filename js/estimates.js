// estimates
function onEstimatesShowed(id) {
    $('[data-mymodal-id="estimates-damage"]').mymodal().open()
}

function onEstimatesChanged(event, id) {
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