$(window).scroll(function() {
    $('.fade-wrapper').each(function() {
        fader.fadeSectionContent($(this));
    });
    
    fader.fadeContactForm();
});

const fader = {
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
    }
}