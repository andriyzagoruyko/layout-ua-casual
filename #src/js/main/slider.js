$(function(){
    new Swiper('.swiper-container', {
        speed: 400,
        loop: true,
        spaceBetween: 30,
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
});
