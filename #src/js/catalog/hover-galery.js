
$(function(){
    if (isMobile) return;

    let galeryTimer = 0;
    let $current_slide = 0;

    $(window).load(function() {
        $(".product-gallery__progress").each(function(){
            let $progress = $(this);
            let $galery =  $progress.closest(".product-gallery")
            let allWidth = $galery.width();
            let slidesNum = $galery.find(".product-gallery__slide").length + 1;
            $progress.width(allWidth/slidesNum - 20);
        })
    })

    $(".product").on("mouseover", function(e){

        if (!$("body").hasClass("mouse")) return;
        
        let $item = $(this);
        let $galery = $item.find(".product-gallery");

        if (galeryTimer || !$galery.length) return;

        let $slides = $galery.find(".product-gallery__slide");
        let $next_slide = $slides.first()

        let currentSlideId = 0;

        loadImg($next_slide.find("img"));

        galeryTimer = setInterval(function (){

            if ($current_slide.length){
                $current_slide.removeClass("active");
            }
    
            if (!$next_slide.length){
                $next_slide = $slides.first();
            }
    
            currentSlideId++;

            $current_slide = $next_slide;
            $current_slide.addClass("active");
    
            if ($current_slide.is(":last-child")){
                $next_slide = currentSlideId = 0;
            }
            else{
                $next_slide = $current_slide.next();
                loadImg($next_slide.find("img"));
            }
            
            setProgress(currentSlideId);
        }, 2500);

        $galery.find(".product-gallery__progress").css("left", '0');
    });

    $(".product").on("mouseleave", function(){
        clearInterval(galeryTimer);
        galeryTimer = 0;

        if ($current_slide.length){
            $current_slide.removeClass("active");
            setProgress(0);
        }
    });

    function loadImg($img){
        let attr = $img.attr("data-src");
        attr && $img.attr("src", attr).removeAttr("data-src");
    }

    function setProgress(slideId){
        $progress = $current_slide.closest(".product-gallery").find(".product-gallery__progress");
        $progress.css("left", ($progress.width() + 20) * slideId);

        if (slideId === 1){
            $current_slide.closest(".product__img").find("img").first().css("opacity", 0);
        }

        if (!slideId){
            $current_slide.closest(".product__img").find("img").first().css("opacity", 1);
        }
    }
});
