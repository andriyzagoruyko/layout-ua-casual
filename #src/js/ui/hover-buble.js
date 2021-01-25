
$(function () {
    $('.buble-hover')
        .on('mouseenter', function (e) {
            if ($("body").hasClass("mouse")) {
                const parentOffset = $(this).offset(),
                    relX = e.pageX - parentOffset.left,
                    relY = e.pageY - parentOffset.top;

                $(this).find('span').css({ top: relY, left: relX })
            }
        })
        .on('mouseout', function (e) {
            if ($("body").hasClass("mouse")) {
                const parentOffset = $(this).offset(),
                    relX = e.pageX - parentOffset.left,
                    relY = e.pageY - parentOffset.top;

                $(this).find('span').css({ top: relY, left: relX })
            }
        });
});