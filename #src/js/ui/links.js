$(function () {
    $(".colapsed__link").on("click", function () {
        let $collapsed = $(this).closest(".colapsed");
        let $collapsed_elem = $collapsed.find(".colapsed__elem");

        if (!$collapsed.hasClass("active")) {
            $collapsed.addClass("active");
            $collapsed_elem.css("max-height", getChildrenHeight($collapsed_elem));
        }
        else {
            $collapsed_elem.css("max-height", '');
            $collapsed.removeClass("active");
        }
    })

    $("a").on("click", function (e) {
        let $link = $(this);
        let attrHref = $link.attr("href");
        let attrModal = $link.attr("data-modal");

        if (attrHref[0] == "#") {
            e.preventDefault();

            if (!attrModal) {
                $(attrHref).length && scrollToElem($(attrHref));
            }
        }
    })
});