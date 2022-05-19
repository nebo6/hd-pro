// TECHNICHIAN START
const dummyTech = {
    img: './img/technitian.jpg',
    name: "Андрей Петрович",
    phone: "+34353535345",
    mail: "msdesdfsd@mail.ua",
    address: "улица Большая Антоновская 56",
    tg: "log",
    wa: "34353535345",
    viber: "viber",
    created: "20.11.2021",
    summ: "14 500$",
    paid: "3 500$",
    projects: "2",
    estimates: [
        dummyEstimates, dummyEstimates,
        dummyEstimates, dummyEstimates,
        dummyEstimates, dummyEstimates,
        dummyEstimates, dummyEstimates,
        dummyEstimates, dummyEstimates,
    ] // dummyEstimates search in estimates.js
}

function createTechCard(data) {
    const temporary = $(".team-card.tech-template").clone(true);
    temporary.removeClass("tech-template d-none");

    temporary.find("[data-t-img]").css("background-image", "url("+data.img+")");
    temporary.find("[data-t-name]").text(data.name)
    temporary.find("[data-t-phone]")
        .text(data.phone)
        .attr("href", "tel:"+data.phone)
    temporary.find("[data-t-mail]")
        .text(data.mail)
        .attr("href", "mailto:"+data.mail)
    temporary.find("[data-t-address]").text(data.address)

    if (data.tg) {
        temporary.find("[data-t-tg]").attr("href", "https://telegram.me/"+data.tg)
        temporary.find("[data-t-tg] img").attr({
            "alt": "https://telegram.me/"+data.tg,
            "title": "https://telegram.me/"+data.tg
        })
    } else {
        temporary.find("[data-t-tg]").parent().remove()
    }

    if (data.wa) {
        temporary.find("[data-t-wa]").attr("href", "https://wa.me/"+data.tg)
        temporary.find("[data-t-wa] img").attr({
            "alt": "https://wa.me/"+data.tg,
            "title": "https://wa.me/"+data.tg
        })
    } else {
        temporary.find("[data-t-wa]").parent().remove()
    }

    if (data.viber) {
        temporary.find("[data-t-viber]").attr("href", "viber://pa?chatURI="+data.viber)
        temporary.find("[data-t-viber] img").attr({
            "alt": "viber://pa?chatURI="+data.viber,
            "title": "viber://pa?chatURI="+data.viber
        })
    } else {
        temporary.find("[data-t-viber]").parent().remove()
    }

    temporary.find("[data-t-reg]").text(data.created)
    temporary.find("[data-t-summ]").text(data.summ)
    temporary.find("[data-t-paid]").text(data.paid)
    temporary.find("[data-t-cars]").text(data.projects)

    if (data.estimates.length) {
        temporary.find("[data-t-estimates]").text(data.estimates.list)
        let list = "";
        
        // ATTENSION! ATTENSION! ATTENSION! ATTENSION! ATTENSION! ATTENSION! ATTENSION! ATTENSION!
        // ATTENSION! ATTENSION! ATTENSION! ATTENSION! ATTENSION! ATTENSION! ATTENSION! ATTENSION!
        if ($(window).width() < 1200) {
            data.estimates.forEach((element, index) => {
                // FOR SMALL DEVICES USE createMobEstimates
                list += "<div class='mb-3 table_card-wrapper' onclick='estimatesDetail("+index+")'>"+createMobEstimates({ // REMOVE INDEX USE CORRECT DATA
                    ...element,
                    id: index // REMOVE INDEX USE CORRECT DATA
                })+"</div>" // look at estimates.js
            })
        } else {
            data.estimates.forEach((element, index) => {
                // FOR LARGE DEVICES USE createMobEstimatesTech
                list += "<div class='mb-3 table_card-wrapper table-tech' onclick='estimatesDetail("+index+")'>"+createMobEstimatesTech({ // REMOVE INDEX USE CORRECT DATA
                    ...element,
                    id: index // REMOVE INDEX USE CORRECT DATA
                })+"</div>" // look at estimates.js
            })
        }
        
        temporary.find(".team-card__list").append($(list))
    }
    
    // FOR MOB AND SMALL DESKTOP OPEN MODAL
    // if ($(window).width() < 1200) {
    //     $(".js-tech-info-mob").html(temporary)
    //     $('[data-mymodal-id="tech-info-mob"]').mymodal().open()
    // } else {
    //     $(".js-team-card-wrapper").html(temporary)
    // }
    return temporary
}
// TECHNICHIAN END
// PAINTER START
let datePainterImages = {
    "04.05.2022": {
        start: "http://farm6.staticflickr.com/5614/15602332537_bae1aaccd8_b.jpg",
        end: "http://farm4.staticflickr.com/3864/14420515212_9999c800b4_m.jpg"
    },
    "06.05.2022": {
        start: "http://farm6.staticflickr.com/5614/15602332537_bae1aaccd8_b.jpg",
        end: "http://farm4.staticflickr.com/3864/14420515212_9999c800b4_m.jpg"
    },
    "12.05.2022": {
        start: "http://farm6.staticflickr.com/5614/15602332537_bae1aaccd8_b.jpg",
        end: "http://farm4.staticflickr.com/3864/14420515212_9999c800b4_m.jpg"
    },
    "13.05.2022": {
        start: "",
        end: ""
    },
}
const dummyPainter = {
    img: './img/technitian.jpg',
    name: "Андрей Петрович",
    phone: "+34353535345",
    mail: "msdesdfsd@mail.ua",
    address: "улица Большая Антоновская 56",
    tg: "log",
    wa: "34353535345",
    viber: "viber",
    created: "20.11.2021",
    summ: "14 500$",
    paid: "14 500$",
    hours: "2",
    photos: "12",
    schedule: datePainterImages
}
function painterActiveDay(data, key) { return data[key] ? "activeDay" : "" }

function initDatepicker(selector, schedule) {
    selector.datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "c-10:c",
        beforeShowDay: function(date, ui) {
            const key = `${formattedNumber(date.getDate())}.${formattedNumber(date.getMonth()+1)}.${date.getFullYear()}`            
            return [1, painterActiveDay(schedule, key)];
        },
        onSelect: function(t, ui) {
            if (schedule[t]) {
                Fancybox.show([{
                    src  : schedule[t].start,
                    caption : getLanguage() === "ru" ? 'Начало работы' : 'Beginning of work',
                    thumb   : schedule[t].start
                },{
                    src  : schedule[t].end,
                    caption : getLanguage() === "ru" ? 'Конец работы' : 'Ending of work',
                    thumb   : schedule[t].end
                }], {
                    infinite : false
                });
            }
        }
    })
}

function createPainterCard(data) {
    const temporary = $(".team-card.painter-template").clone();
    temporary.removeClass("painter-template d-none");

    temporary.find("[data-t-img]").css("background-image", "url("+data.img+")");
    temporary.find("[data-t-name]").text(data.name)
    temporary.find("[data-t-phone]")
        .text(data.phone)
        .attr("href", "tel:"+data.phone)
    temporary.find("[data-t-mail]")
        .text(data.mail)
        .attr("href", "mailto:"+data.mail)
    temporary.find("[data-t-address]").text(data.address)

    if (data.tg) {
        temporary.find("[data-t-tg]").attr("href", "https://telegram.me/"+data.tg)
        temporary.find("[data-t-tg] img").attr({
            "alt": "https://telegram.me/"+data.tg,
            "title": "https://telegram.me/"+data.tg
        })
    } else {
        temporary.find("[data-t-tg]").parent().remove()
    }

    if (data.wa) {
        temporary.find("[data-t-wa]").attr("href", "https://wa.me/"+data.tg)
        temporary.find("[data-t-wa] img").attr({
            "alt": "https://wa.me/"+data.tg,
            "title": "https://wa.me/"+data.tg
        })
    } else {
        temporary.find("[data-t-wa]").parent().remove()
    }

    if (data.viber) {
        temporary.find("[data-t-viber]").attr("href", "viber://pa?chatURI="+data.viber)
        temporary.find("[data-t-viber] img").attr({
            "alt": "viber://pa?chatURI="+data.viber,
            "title": "viber://pa?chatURI="+data.viber
        })
    } else {
        temporary.find("[data-t-viber]").parent().remove()
    }

    temporary.find("[data-t-reg]").text(data.created)
    temporary.find("[data-t-summ]").text(data.summ)
    temporary.find("[data-t-paid]").text(data.paid)

    temporary.find("[data-t-hours]").text(data.hours)
    temporary.find("[data-t-photos]").text(data.photos)
    // DATEPICKER
    initDatepicker(temporary.find(".team-card__datepicker"), data.schedule)
    // form
    $(".painter-photo")[0].onsubmit = function(event) {
        onLoadPainterImg(event, function (newSchedule) {
            if (temporary.find(".team-card__datepicker").hasClass("hasDatepicker"))
                temporary.find(".team-card__datepicker").datepicker("destroy")

            initDatepicker(temporary.find(".team-card__datepicker"), newSchedule)
            temporary.find(".team-card__datepicker").datepicker("refresh")
        });
    }
    return temporary
}

function onLoadPainterImg(event, callback) {
    event.preventDefault();
    const formData = new FormData(event.target)

    addBodyLoader();
    // server
    // if success get new schedule with new image
    callback({
        ...dummyPainter.schedule,
        "15.04.2022": {
            start: "http://farm6.staticflickr.com/5614/15602332537_bae1aaccd8_b.jpg",
            end: ""
        },
    })
    $('[data-mymodal-id="load-photo"]').mymodal().close()
    // error alertNotice
    // finally
    removeBodyLoader();
}
// PAINTER END
// TIME START
function createPhotoBtn({id, href, caption}) {
    return `<a href="${href}" data-fancybox="gallery${id}" class="btn btn_clean" data-caption="${caption}"><span class="table__icon table__icon_photo_red mx-auto"></span></a>`
}

function onUploadClicked(event) {
    const id = $(this).closest('[data-team-time-id]').attr('data-team-time-id')
    const form = $('.time-photo');
    form[0].onsubmit = function(event) {
        event.preventDefault();
        console.log("submit");
        addBodyLoader();
        // server request with id
        // get loaded image href and time
        // on success
        const data = {
            start: {
                img: "http://farm6.staticflickr.com/5614/15602332537_bae1aaccd8_b.jpg",
                time: new Date().toLocaleTimeString()
            },
            end: null
        }
        const tr = $('[data-team-time-id="'+id+'"]');
        if (data.start) {
            tr.find("[data-time-start]").text(data.start.time)
            tr.find("[data-time-start-wrapper]").html(createPhotoBtn({
                id, 
                href: data.start.img,
                caption: getLanguage() === "ru" ? "До" : "Start", 
            }))
        }
        if (data.end) {
            tr.find("[data-time-end]").text(data.start.time)
            tr.find("[data-time-end-wrapper]").html(createPhotoBtn({
                id, 
                href: data.start.img,
                caption: getLanguage() === "ru" ? "После" : "End", 
            }))
        }
        $('[data-mymodal-id="load-photo"]').mymodal().close()
        // onError
        // alertNotice(title, description, "danger")
        // finally
        removeBodyLoader()
    }
    $('[data-mymodal-id="load-photo"]').mymodal().open()
}

// REMOVE TIME CARD FROM LIST
function onTimeRemoveConfirmed(id) {
    if (isNaN(parseInt(id))) alert("Something went wrong")
    addBodyLoader()
    setTimeout(function() {
        const target = $('[data-team-time-id="'+id+'"]')
        target.remove()
        removeBodyLoader()
    }, 2000)
}

function onTimeRemove(event) {
    const id = $(this).closest('[data-team-time-id]').attr('data-team-time-id');
    const modal = $('.mymodal_confirmation');
    $(document).on("opening", modal, function() {
        const title = getLanguage() === "ru" ? `Вы уверены, что хотите удалить временную карту ID ${id}?` : `Are you sure you want to delete a time card ID${id}?`
        $(this).find(".confiramtion-title").text(title);
    });
    $(document).on("confirmation", modal, onTimeRemoveConfirmed.bind(this, id));
    $(document).on("closed", modal, function() {
        $(this).find(".confiramtion-title").text("")
        $(document).off("confirmation", onTimeRemoveConfirmed);
    });

    modal.mymodal().open();
}
// NOTIFICATIONS
function onNotificationsAdd(event) {
    event.preventDefault();
    console.log($(event.target).serialize());
    console.log("add notification");
}

function initTinyMce() {
    // notifications mce
    tinymce.init({
        selector: '#mce',
        file_picker_types: 'image media file',
        height: 200,
        plugins: [
            'advlist autolink link image lists charmap print preview hr anchor pagebreak',
            'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
            'table emoticons template paste help'
          ],
        toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
            'forecolor backcolor emoticons | help | upload',
        setup: function (editor) {
                console.log(editor);
                editor.ui.registry.addButton('upload', {
                    icon: "upload",
                    tooltip: "Upload",
                    onAction: function () {
                        console.log("action");
                        editor.insertContent('&nbsp;<b>This is suppose to import a file</b>&nbsp;');
                    }
            });
        },
        file_picker_callback: function (cb, value, meta) {
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
        
            input.onchange = function () {
                var file = this.files[0];
            
                var reader = new FileReader();
                reader.onload = function () {
                    var id = 'blobid' + (new Date()).getTime();
                    var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                    var base64 = reader.result.split(',')[1];
                    var blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);
            
                    /* call the callback and populate the Title field with the file name */
                    cb(blobInfo.blobUri(), { title: file.name });
                };
                reader.readAsDataURL(file);
            };
        
            input.click();
        },
    });
}

$(function() {
    // CLICK ON THECHNITIAN TABLE
    $(document).on("click", ".js-team-tech", function() {
        if (!$(this).hasClass("active")) {
            // remove old active
            // set new active
            const tr = $(this)
            const id = tr.data("data-tech-id");
            addBodyLoader();
            // server request with id
            // if success get data and
            setTimeout(() => {
                if ($(window).width() < 1200) {
                    $(".js-tech-info-mob").html(createTechCard(dummyTech))
                    $('[data-mymodal-id="tech-info-mob"]').mymodal().open()
                } else {
                    $(".js-team-card-wrapper").html(createTechCard(dummyTech))
                }
                $(".js-team-tech.active").removeClass("active");
                console.log($(this));
                tr.addClass("active")
                removeBodyLoader(); // REMOVE ON PROD
            }, 1000)
            // finally
            // removeBodyLoader(); UNCOMMENT ON PROD
        } else {
            if ($(window).width() < 1200)
                $('[data-mymodal-id="tech-info-mob"]').mymodal().open()
        }
    })
    // PAINTER
    $(document).on("click", ".js-team-painter", function() {
        if (!$(this).hasClass("active")) {
            // remove old active
            // set new active
            const tr = $(this)
            const id = tr.data("data-painter-id");
            addBodyLoader();
            // server request with id
            // if success get data and
            setTimeout(() => {
                if ($(window).width() < 1200) {
                    $(".js-painter-info-mob").html(createPainterCard(dummyPainter))
                    $('[data-mymodal-id="painter-info-mob"]').mymodal().open()
                } else {
                    $(".js-team-card-wrapper").html(createPainterCard(dummyPainter))
                }
                
                $(".js-team-painter.active").removeClass("active");
                console.log($(this));
                tr.addClass("active")
                removeBodyLoader(); // REMOVE ON PROD
            }, 1000)
            // finally
            // removeBodyLoader(); UNCOMMENT ON PROD
        } else {
            if ($(window).width() < 1200)
                $('[data-mymodal-id="painter-info-mob"]').mymodal().open()
        }
    })
    // TEAM TIMES
    $(document).on("click", ".js-upload-time-photo", onUploadClicked)
    $(document).on("click", ".js-remove-time", onTimeRemove)
    
    if ($("#mce").length) initTinyMce()
})