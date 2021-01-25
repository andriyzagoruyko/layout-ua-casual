$(function () {
    $("[data-tabid]").on("click", function (e) {
        const $tab = $(this);
        const $tabs_block = $tab.closest(".tabs");
        const $tabs = $tabs_block.find("[data-tab]");
        const tabIndex = $tab.parent("ul").children().index($tab);

        $tabs_block.find(".active").removeClass("active");
        $tab.addClass("active");
        $($tabs[tabIndex]).addClass("active");
    });
});