
$(function(){
    $(document).on("mouseover", ".menu-header__link", function(){

        let $parent =  $(this).parent(".menu-item-parent");

        if (!$parent.length){
            return;
        }

        $(".header__menu").addClass("active").trigger("header_menu_open");
        $(".menu-item-has-children").not($parent).removeClass("active");

        $parent.addClass("active");

        $(".header__nav-search").removeClass("active");
    });

    $(document).on("click", ".menu-header__link", function(e){

        let $menu_item = $(this).parent(".menu-item-has-children");

        if (!$menu_item.length || $menu_item.is(".menu-item-parent")){
            return;
        }

        e.preventDefault();

        let $parent = $menu_item.closest(".menu-item-parent");

        $(".menu-item-has-children").not($parent).removeClass("active");

        $menu_item.addClass("active");
    });

    $(".header").on("mouseleave", function(){
        $(".menu-item-has-children").removeClass("active");
        $(".header__menu").removeClass("active");
        $(this).trigger("header_menu_close");
    });

    $(document).on("click", ".menu-catalog-close", function(){
        $(".menu-item-has-children").removeClass("active");
        $(".header__menu").removeClass("active");
        $(this).trigger("header_menu_close");
    })

    $(document).on("click", ".hamburger, .navigation__overlay", function(){
        $(".navigation").toggleClass("active");
    })
    
    $(".menu-navigation__link").on("click", function(e){
        
        let $menu_item = $(this).parent(".menu-item-has-children");
        
        if (!$menu_item.length){
            return;
        }

        e.preventDefault();

        let $parent = $menu_item.closest(".menu-item-parent");

        if ($menu_item.hasClass("active")){
            $menu_item.removeClass("active");
            $menu_item.find(".active").removeClass("active");

            return;
        }

        $(".menu-item-has-children").not($parent).removeClass("active");

        $menu_item.addClass("active");
    });
})