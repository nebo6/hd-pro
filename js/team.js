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
    const tech = $(".team-card.tech-template").clone();
    tech.removeClass("tech-template d-none");

    tech.find("[data-t-img]").css("background-image", "url("+data.img+")");
    tech.find("[data-t-phone]")
        .text(data.phone)
        .attr("href", "tel:"+data.phone)
    tech.find("[data-t-mail]")
        .text(data.mail)
        .attr("href", "mailto:"+data.mail)
    tech.find("[data-t-address]").text(data.address)

    if (data.tg) {
        tech.find("[data-t-tg]").attr("href", "https://telegram.me/"+data.tg)
        tech.find("[data-t-tg] img").attr({
            "alt": "https://telegram.me/"+data.tg,
            "title": "https://telegram.me/"+data.tg
        })
    } else {
        tech.find("[data-t-tg]").parent().remove()
    }

    if (data.wa) {
        tech.find("[data-t-wa]").attr("href", "https://wa.me/"+data.tg)
        tech.find("[data-t-wa] img").attr({
            "alt": "https://wa.me/"+data.tg,
            "title": "https://wa.me/"+data.tg
        })
    } else {
        tech.find("[data-t-wa]").parent().remove()
    }

    if (data.viber) {
        tech.find("[data-t-viber]").attr("href", "viber://pa?chatURI="+data.viber)
        tech.find("[data-t-viber] img").attr({
            "alt": "viber://pa?chatURI="+data.viber,
            "title": "viber://pa?chatURI="+data.viber
        })
    } else {
        tech.find("[data-t-viber]").parent().remove()
    }

    tech.find("[data-t-reg]").text(data.created)
    tech.find("[data-t-summ]").text(data.summ)
    tech.find("[data-t-paid]").text(data.paid)
    tech.find("[data-t-cars]").text(data.projects)

    if (data.estimates.length) {
        tech.find("[data-t-estimates]").text(data.estimates.list)
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

        tech.find(".team-card__list").append($(list))
    }
    
    $(".js-team-card-wrapper").html(tech)
}
// TECHNICHIAN END
const datePainterImages = {
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

function painterActiveDay(data, key) {
    return data[key] ? "activeDay" : ""
}

function createPainterCard(data) {
    const tech = $(".team-card.tech-template").clone();
    tech.removeClass("tech-template d-none");

    tech.find("[data-t-img]").css("background-image", "url("+data.img+")");
    tech.find("[data-t-phone]")
        .text(data.phone)
        .attr("href", "tel:"+data.phone)
    tech.find("[data-t-mail]")
        .text(data.mail)
        .attr("href", "mailto:"+data.mail)
    tech.find("[data-t-address]").text(data.address)

    if (data.tg) {
        tech.find("[data-t-tg]").attr("href", "https://telegram.me/"+data.tg)
        tech.find("[data-t-tg] img").attr({
            "alt": "https://telegram.me/"+data.tg,
            "title": "https://telegram.me/"+data.tg
        })
    } else {
        tech.find("[data-t-tg]").parent().remove()
    }

    if (data.wa) {
        tech.find("[data-t-wa]").attr("href", "https://wa.me/"+data.tg)
        tech.find("[data-t-wa] img").attr({
            "alt": "https://wa.me/"+data.tg,
            "title": "https://wa.me/"+data.tg
        })
    } else {
        tech.find("[data-t-wa]").parent().remove()
    }

    if (data.viber) {
        tech.find("[data-t-viber]").attr("href", "viber://pa?chatURI="+data.viber)
        tech.find("[data-t-viber] img").attr({
            "alt": "viber://pa?chatURI="+data.viber,
            "title": "viber://pa?chatURI="+data.viber
        })
    } else {
        tech.find("[data-t-viber]").parent().remove()
    }

    tech.find("[data-t-reg]").text(data.created)
    tech.find("[data-t-summ]").text(data.summ)
    tech.find("[data-t-paid]").text(data.paid)
    tech.find("[data-t-cars]").text(data.projects)

    if (data.estimates.length) {
        tech.find("[data-t-estimates]").text(data.estimates.list)
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

        tech.find(".team-card__list").append($(list))
    }
    
    $(".js-team-card-wrapper").html(tech)
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
    $(".team-card__datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        beforeShowDay: function(date, ui) {
            const key = `${formattedNumber(date.getDate())}.${formattedNumber(date.getMonth()+1)}.${date.getFullYear()}`            
            return [1, painterActiveDay(datePainterImages, key)];
        },
        onSelect: function(t, ui) {
            console.log(t, ui);
            if (datePainterImages[t]) {
                Fancybox.show([{
                    src  : datePainterImages[t].start,
                    caption : getLanguage() === "ru" ? 'Начало работы' : 'Beginning of work',
                    thumb   : datePainterImages[t].start
                },{
                    src  : datePainterImages[t].end,
                    caption : getLanguage() === "ru" ? 'Конец работы' : 'Ending of work',
                    thumb   : datePainterImages[t].end
                }], {
                    infinite : false
                });
            }
        }
    })
})