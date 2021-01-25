$(function(){
    $(window).on("load", function(){
        new Swiper('.cat-carousel__slider', {
            speed: 400,
            loop: false,
            spaceBetween: 10,
            slidesPerView: 'auto',
            freeMode: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
                dynamic: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    })
});
