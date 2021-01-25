let isDisabledSticky = false;

function disableStickyHeader(state){
    isDisabledSticky = state;
    isDisabledSticky && $(".header-double").addClass("hidden");
}

$(function(){
    const $window = $(window), $header = $(".header"), $sticky_buttons = $(".sticky-wrapper");
    const $sticky_double = $header.clone();
    let lastScrollTop = 0, stickyState = false, shouldSticky =  false, lockSticky = false;

    $sticky_double
        .addClass("header-double sticky hidden")
        .appendTo(".site__main")

    $(document).on("header_menu_open", function(e, newState){
        lockSticky = true;
    });

    $(document).on("header_menu_close", function(e, newState){
        lockSticky = false;
        enableSticky(shouldSticky);
    });
    
    $window.on("scroll", function(){
        if (!isDisabledSticky){
            let scrollTop = $window.scrollTop();
            let stickyOffs = $header.offset().top + $header.height();

            shouldSticky =  ((lastScrollTop > scrollTop) && (scrollTop > stickyOffs));
            lastScrollTop = scrollTop;
        }

        if (lockSticky){
            return;
        }
        
        if (!stickyState){
            shouldSticky && enableSticky(true);
        }else{
            !shouldSticky && enableSticky(false);
        }
    });

    $(".sticky-button-top").on("click", function(e){
        let $button = $(this);
        $button.addClass("active");
        scrolling(0, function(){
            $button.removeClass("active");
        });
    })

    function enableSticky(state){
        stickyState = state;
        $sticky_double.toggleClass("hidden", !state);
        $sticky_buttons.toggleClass("active", state);
    }
})
