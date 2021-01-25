$(function () {
    let $breadcrumbs = $(".breadcrumbs");

    if ($breadcrumbs.length) {
        setTimeout(function () {
            let width = 0;

            $breadcrumbs.find(">span").each(function () {
                width += $(this).width();
            })

            if (width > $breadcrumbs.width()) {
                $breadcrumbs.parent().addClass("overflowed");
                $breadcrumbs.animate({ scrollLeft: width }, 800);
            }
        }, 400)
    }
});