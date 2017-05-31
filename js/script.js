$(document).ready(function() {

    $('#form-contact').submit(function(event) {

        contactForm.setFormStatus("loading");

        var formElement = document.getElementById("form-contact");

        contactForm.submitForm(event, formElement);
    });

    fader.fadeAllSections();

    $("#title-bio").typed({
        strings: ["bio"],
        typeSpeed: 500,
        startDelay: 500,
        showCursor: false
    });
    $("#title-bags").typed({
        strings: ["bags"],
        typeSpeed: 400,
        startDelay: 1000,
        showCursor: false,
        onStringTyped: fader.fadeLogo
    });

    // SMOOTH SCROLL
    $('a.smooth-scroll').click(function(){
        if ($.attr(this, 'href') === "#") {
            return true; // No target
        } else {
            var current = $(window).scrollTop();
            var target = $( $.attr(this, 'href') ).offset().top;
            var duration = Math.abs(target - current) / 1.5;
            $('html, body').animate({
                scrollTop: target
            }, duration);
            return false;
        }
    });
});

$(window).scroll(function() {
    fader.fadeAllSections();

    fader.fadeNav();
    fader.fadeContactForm();
});

const fader = {
    fadeAllSections: function() {
        $('.fade-wrapper').each(function() {
            fader.fadeSectionContent($(this));
        });
    },
    fadeSectionContent: function(section) {
        var top = section.offset().top;
        var bottom = top + section.outerHeight();
        var viewportTop = $(document).scrollTop();
        var viewportBottom = viewportTop + window.innerHeight;

        // Return if section doesn't need fading (isn't in the viewport)
        if (viewportBottom < top || viewportTop > bottom) {
            return;
        }

        var opacity = 1 - (1 * (Math.abs(top - viewportTop) / window.innerHeight * 2));

        if (opacity < 0) {
            opacity = 0;
        }

        var id = section.attr('id');

        $('#' + id + ' .fade-content').css('opacity', opacity);
    },
    fadeContactForm: function() {
        var bottom = $('#contact').offset().top + $('#contact').outerHeight();
        var viewportBottom = $(document).scrollTop() + window.innerHeight;

        if (Math.abs(bottom - viewportBottom) < 20) {
            var interval = 200; // milliseconds
            var time = interval;
            $('#contact-form .fade-in').each(function() {
                var element = $(this);
                setTimeout( function(){ 
                    element.addClass("visible"); 
                }, time)
                time += interval;
            });
        }
    },
    fadeLogo: function() {
        $('#porter-logo').addClass("visible");
    },
    fadeNav: function() {
        var viewportTop = $(document).scrollTop();
        var start = window.innerHeight / 2;
        var end = window.innerHeight;

        if (viewportTop > end) {
            $('nav').css("opacity", 1);
        } else if (viewportTop > start) {
            $('nav').css("opacity", (viewportTop - start) / (end - start));
        } else {
            $('nav').css("opacity", 0);
        }
    }
}

const contactForm = {
    getFormData: function(formElement) {
        var formData = new FormData(formElement),
            data = [];

        for (var key of formData) {
            data.push(encodeURIComponent(key[0]) + "=" + encodeURIComponent(key[1]));
        }

        return data.join("&");
    },
    submitForm: function(event, formElement) {
        event.preventDefault();

        var request = new XMLHttpRequest();

        request.addEventListener("load", function () {
            if (request.status === 302 || request.status === 0) { // CloudCannon redirects on success
                contactForm.setFormStatus("complete");
            }
        });

        request.open(formElement.method, formElement.action);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(contactForm.getFormData(formElement));
    },
    setFormStatus: function(status) {
        $('#contact-wrapper').removeClass().addClass(status);
    }
}