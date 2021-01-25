function scrolling(top, onStop){
    $("html, body").stop().animate({scrollTop: top}, 800, 'swing', onStop);
}

function scrollToElem($elem, offset = 0, onStop){
    scrolling($elem.offset().top + offset);
}

function getChildrenHeight($parent){
    let $children = $parent.children();
    let height = 0;
    
    $children.each(function(){
        height += $(this).outerHeight(true);
    })

    return height;
}

Math.clip = function(number, min, max) {
    return Math.max(min, Math.min(number, max));
}