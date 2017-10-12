(function ($) {
    
    "use strict";


/* Sticky Navigation */
    $('.main-navigation').onePageNav({
        scrollThreshold: 0.2,
        scrollOffset: 75,
        filter: ':not(.external)',
        changeHash: true
    }); 

    /* Navigation Visible On Scroll */
    mainNav();
    $(window).scroll(function () {
        mainNav();
    });

    function mainNav() {
        var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        if (top > 40) $('.sticky-navigation').stop().animate({
            "opacity": '1',
            "top": '0'
        });
        else $('.sticky-navigation').stop().animate({
            "opacity": '0',
            "top": '-75'
        });
    }


/* OWL Carousel */
    var owl = $("#portfolio");
    owl.owlCarousel({
        items: 3, 
        itemsDesktop: [1000, 3],
        itemsDesktopSmall: [900, 2], 
        itemsTablet: [600, 1], 
        itemsMobile: false,
        navigation: false, 
        slideSpeed: 800,
        paginationSpeed: 410,
        autoPlay: 5000,
        stopOnHover: true
    });
    
    $(document).ready(function() {
      $(".owl-carousel").owlCarousel({
        autoPlay: 3000,
        items : 4,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3]
      });

    });


/*  Nivo Lightbox */
    $('#portfolio a').nivoLightbox({
        effect: 'fadeScale',
    });



/* Video Responsive */
    $(".container-video").fitVids();


/* Smooth Scroll */
    var scrollAnimationTime = 1200,
        scrollAnimation = 'easeInOutExpo';
    $('a.scrollto').bind('click.smoothscroll', function (event) {
        event.preventDefault();
        var target = this.hash;
        $('html, body').stop().animate({
            'scrollTop': $(target).offset().top
        }, scrollAnimationTime, scrollAnimation, function () {
            window.location.hash = target;
        });
    });


/* Bootstrap Internet Explorer 10 in Windows 8 and Windows Phone 8 Viewport FIX */
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement('style')
        msViewportStyle.appendChild(
        document.createTextNode('@-ms-viewport{width:auto!important}'))
        document.querySelector('head').appendChild(msViewportStyle)
    }
})(jQuery);




$(window).resize(function () {

    "use strict";

    var ww = $(window).width();
    
    /* COLLAPSE NAVIGATION ON MOBILE AFTER CLICKING ON LINK */
    
    if (ww < 480) {
        $('.main-navigation a').on('click', function () {
            $(".navbar-toggle").click();
        });
    }
});