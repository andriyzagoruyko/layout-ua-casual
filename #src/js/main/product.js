$(function () {
    if (!$('body').hasClass('single-product')) {
        return;
    }

    new Swiper('.single-gallery__thumbnails-nav', {
        slidesPerView: 4,
        direction: 'vertical',
        speed: 400,
        loop: false,
        spaceBetween: 30,
        freeMode: true,
        navigation: {
            nextEl: '.single-gallery__btn-next',
            prevEl: '.single-gallery__btn-prev',
            disabledClass: "disabled",
        },
    });

    const galery = new Swiper('.single-gallery__image', {
        speed: 400,
        loop: true,
        spaceBetween: 30,
        simulateTouch: false,

        lazy: {
            loadPrevNext: true,
        },

        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            dynamicBullets: true,
        },

        breakpoints: {
            1024: {
                simulateTouch: true,
                pagination: false,
            },
            650: {
                slidesPerView: 2,
            },
            850: {
                slidesPerView: 1,
            }
        }
    });

    $(document).on("click", ".single-gallery__image", function (e) {
        e.preventDefault();

        let $slider = $(this);
        let $links = $(galery.slides).not(".swiper-slide-duplicate").find("a");
        let items = [];

        $links.each(function () {
            items.push({ src: $(this).attr("href") });
        })

        $slider.lightGallery({
            dynamic: true,
            download: false,
            dynamicEl: items,
            speed: 200
        });

        $slider.one('onAfterOpen.lg', function () {
            $slider.data('lightGallery').slide(galery.realIndex);
        });
    });

    $(".single-gallery__thumb").on("mouseover", function () {
        let $thumb = $(this);
        let index = $thumb.attr("data-id");
        galery.slideTo(index, 0);

        $(".single-gallery__thumb").removeClass("active");

        $thumb.addClass("active");
    })

    $(".products-slider").each(function () {
        let $slider = $(this);

        let breakpoints = $slider.attr("data-breakpoints").split(",");
        let maxSlides = $slider.attr("data-slides").split(",");

        let settings = { 320: { slidesPerView: 0 } };

        breakpoints.forEach(function (item, i) {
            settings[+item] = { slidesPerView: +maxSlides[i] };
        });

        let swiper = new Swiper($slider.get(), {
            speed: 400,
            loop: true,
            spaceBetween: 30,

            loop: false,
            freeMode: false,

            lazy: {
                loadPrevNext: true,
            },

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            breakpoints: settings
        });
    });
});

