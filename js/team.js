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
    estimates: [dummyEstimates, dummyEstimates] // dummyEstimates search in estimates.js
}

function createTechCard(data) {
    const temporary = $(".team-card.tech-template").clone();
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
        // ATTENSION! ATTENSION! ATTENSION! ATTENSION! ATTENSION! ATTENSION! ATTENSION! ATTENSION!
        // ATTENSION! ATTENSION! ATTENSION! ATTENSION! ATTENSION! ATTENSION! ATTENSION! ATTENSION!
        // ATTENSION! ATTENSION! ATTENSION! ATTENSION! ATTENSION! ATTENSION! ATTENSION! ATTENSION!
        data.estimates.forEach((element, index) => {
            list += createMobEstimates({ // REMOVE INDEX USE CORRECT DATA
                ...element,
                id: index // REMOVE INDEX USE CORRECT DATA
            }, "team-card__estimates") // look at estimates.js
        });

        temporary.find(".team-card__list").append($(list))
    }
    
    $(".js-team-card-wrapper").html(temporary)
}
// TECHNICHIAN END
// PAINTER START
let datePainterImages = {
    "04.04.2022": {
        start: "http://farm6.staticflickr.com/5614/15602332537_bae1aaccd8_b.jpg",
        end: "http://farm4.staticflickr.com/3864/14420515212_9999c800b4_m.jpg"
    },
    "06.04.2022": {
        start: "http://farm6.staticflickr.com/5614/15602332537_bae1aaccd8_b.jpg",
        end: "http://farm4.staticflickr.com/3864/14420515212_9999c800b4_m.jpg"
    },
    "12.04.2022": {
        start: "http://farm6.staticflickr.com/5614/15602332537_bae1aaccd8_b.jpg",
        end: "http://farm4.staticflickr.com/3864/14420515212_9999c800b4_m.jpg"
    },
    "13.04.2022": {
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
    $(".js-team-card-wrapper").html(temporary)
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
                createTechCard(dummyTech)
                $(".js-team-tech.active").removeClass("active");
                console.log($(this));
                tr.addClass("active")
                removeBodyLoader(); // REMOVE ON PROD
            }, 1000)
            // finally
            // removeBodyLoader(); UNCOMMENT ON PROD
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
                createPainterCard(dummyPainter)
                $(".js-team-painter.active").removeClass("active");
                console.log($(this));
                tr.addClass("active")
                removeBodyLoader(); // REMOVE ON PROD
            }, 1000)
            // finally
            // removeBodyLoader(); UNCOMMENT ON PROD
        }
    })
})