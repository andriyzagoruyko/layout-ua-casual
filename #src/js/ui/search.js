$(function () {
    $(document).on("click", ".header__nav-search", function (e) {
        const $target = $(e.target);

        if ($target.parent("a").length || $target.is("a")) {
            e.preventDefault();
            $(this).toggleClass("active");
        }
    });

    $(document).mouseup(function (e) {
        const $header_search = $(".header__nav-search");

        if (!$header_search.is(e.target) && $header_search.has(e.target).length === 0) {
            $header_search.removeClass("active");
        }
    });
});

