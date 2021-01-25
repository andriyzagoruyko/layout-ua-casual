$(function(){
    $('.filter-block__body').scrollbar()

    $(".orderby__list").on("click", function(e){
        let $list = $(this);
        let $target = $(e.target);
        let $item = $target.closest("li");

            if (!$item.is("active") && $target.is("a")){
                $list.find(".active").removeClass("active");
                $item.addClass("active");
                $(".orderby__button-list").removeClass("active").find("a").text($target.text());
                $list.removeClass("show");
            }
        
    });

    $(".orderby__button-list").on("click", function(e){
        e.preventDefault();

        let $button = $(this);
        let $list = $button.closest(".orderby__select").find(".orderby__list");

        if ($list.is(".show")){
            $list.removeClass("show");
            $button.removeClass("active");
        }
        else{
            $list.addClass("show");
            $button.addClass("active");
        }
    });
})

$(function(){
    $(window).on("load", function(){
        let shouldBeHidden = (window.matchMedia('(max-width: 850px)').matches);

        $(".filter-block").each(function(){
            let $block =  $(this);
            let height = $block.height();
            $block.attr("data-height", height);

            if (shouldBeHidden && $block.attr("data-type") != 'price'){
                $block.addClass("filter-block-hidden");
                $block.find(".filter-block__wrapper").css("max-height", 0);
            }
        });
    });

    $(document).on("sidebar_toggle", function(e, type, state){
        if (!state && type === "sidebar_filter" ){
            $(".filter-block").each(function(){
                let $block = $(this);

                if ($block.attr("data-type") != 'price'){
                    $block.addClass("filter-block-hidden");
                    $block.find(".filter-block__wrapper").css("max-height", 0);
                }
            });
        }
    });

    $("[data-sidebar-button]").on("click", function(){
        let $button = $(this)

        if ($button.is(".active")){
            toggleSidebar(false);
        }
        else{
            getSidebarState() && toggleSidebar(false);
            toggleSidebar($button.attr("data-sidebar-button"));
            $button.addClass("active");
        }
    });

    $(".catalog-sidebar__close").on("click", function(){
        toggleSidebar(false);
    });

    $(".catalog-sidebar__reset").on("click", function(){
        let $filters = $(this).closest(".catalog-sidebar").find(".filter__block");

        $filters.each(function(){
            resetFilterblock($(this));
        })
    });

    $(".filter-block__header").on("click", function(e){
        e.preventDefault();

        if (!$(e.target).is(".filter-block__reset")){

            let $block =  $(this).closest(".filter-block");
            let $wrapper = $block.find(".filter-block__wrapper");
            let height =  +$block.attr("data-height");

            if ($block.is(".filter-block-hidden")){
                $wrapper.css("max-height", height);
                $block.removeClass("filter-block-hidden");
            }
            else{
                $block.addClass("filter-block-hidden");
                $wrapper.css("max-height", height);
                setTimeout(function(){
                        $wrapper.css("max-height", "0");
                    }, 100);
            }
        }
        else{
            let $filter_block = $(this).closest(".filter-block");
            resetFilterblock($filter_block);
        }
    });

    $(".filter-block__item").on("click", function(){
        let $item = $(this);
        let $filter_block = $item.closest(".filter-block");
        
        $item.toggleClass("selected");

        updateFilterblockState($filter_block)
        updateSidebarState();
    });

    $(".price-input").on("change", function(){
        let $input = $(this);
        let $parent = $input.closest(".filter-block__price-range");

        let minPrice = +$parent.attr("data-min");
        let maxPrice = +$parent.attr("data-max");

        let currentVal = Math.clip($input.val(), minPrice, maxPrice);

        $input.val(currentVal);

        $input.closest(".filter-block").addClass("filter-selected");

        updateSidebarState();
    });

    let $sidebar = $(".catalog-sidebar");

    function getSidebarState(){
        return $sidebar.is(".sidebar-active");
    }

    function toggleSidebar(type, state){
        let $block; 

        if (type){
            $block = $("#" + type);
        }
        else{
            $block = $(".sidebar-block-active");
            type = $block.attr("id");
        }

        if (!$block.length) return;

        if (typeof state === 'undefined'){
            state = !$block.is(".sidebar-block-active");
        }

        if (state && type){
            $("#sidebar-title").text($block.attr("data-title"));
        }

        $(document).trigger("sidebar_toggle", [ type, state ] );

        disableStickyHeader(state);

        $sidebar.attr("data-current-block", type);
        $sidebar.toggleClass("sidebar-active", state);
        $block.toggleClass("sidebar-block-active", state);

        !state && $("[data-sidebar-button]").removeClass("active");
    }

    function getFilterblockType($filter_block){
        return $filter_block.attr("data-type");
    }

    function resetFilterblock($filter_block){
        let type =  getFilterblockType($filter_block);

        if (type === "checklist"){
            let $fieldset = $filter_block.find("fieldset");
            $fieldset.find(".selected").removeClass("selected");
        }

        if (type === "price"){
            let $input = $filter_block.find("input");
            let $price_range = $filter_block.find(".filter-block__price-range");

            let minPrice = +$price_range.attr("data-min");
            let maxPrice = +$price_range.attr("data-max");

            $input.filter('[name="start_price"]').val(minPrice);
            $input.filter('[name="end_price"]').val(maxPrice);
        }

        updateFilterblockState($filter_block);
        updateSidebarState();
    }

    function updateFilterblockState($filter_block){
        let $fieldset = $filter_block.find("fieldset");
        let isFilterBlockSelected = $fieldset.find(".selected").length > 0;

        $filter_block.toggleClass("filter-selected", isFilterBlockSelected);
    }

    function updateSidebarState(){
        let isSelected = $(".filter-block").filter(".filter-selected").length > 0;
        $(".catalog-sidebar").toggleClass("sidebar-filter-selected", isSelected);
    }
});