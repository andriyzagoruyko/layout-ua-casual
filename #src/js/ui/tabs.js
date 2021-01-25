$(function () {
    $("[data-tabid]").on("click", function (e) {
        let $tab = $(this);
        let $tabs_block = $tab.closest(".tabs");
        let $tabs = $tabs_block.find("[data-tab]");

        $tabs_block.find(".active").removeClass("active");

        let tabIndex = $tab.parent("ul").children().index($tab);

        $tab.addClass("active");
        $($tabs[tabIndex]).addClass("active");
    });
});