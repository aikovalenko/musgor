//= ../libs/jquery/dist/jquery.min.js
//= ../libs/fullpage.js/dist/jquery.fullpage.min.js
//= ../libs/mCustomScrollbar/jquery.mCustomScrollbar.min.js
//= ../libs/magnific-popup/dist/jquery.magnific-popup.min.js
//= ../libs/slick-carousel/slick/slick.min.js
//= ../libs/platform.js

function setObjectsWidth() {
    var oW = $(".map-main").width();
    $('.objects').css({ width: oW});
}
function showObject() {
    var object = $(".object .building"),
        objectName = $(".object .name"),
        objectMap = $(".map-object");

    // object.each( function( i ) {
    //     for (i = 0; i < object.length; i++) {
    //         $(this).find(".building").hover(
    //             function () {
    //                 $(".map-object" + i).addClass('show');
    //                 $(object + i).find(".name").addClass('show');
    //             },
    //             function () {
    //                 $(objectMap + i).removeClass('show');
    //                 $(object + i).find(".name").removeClass('show');
    //             }
    //         );
    //     }
    //
    // });
    object.on('mouseenter', function() {
        // console.log('hover');

        var id = $(this).attr('id');
        console.log(id);
        $('.map-object-'+id).addClass('show');
        $(this).next(".name").addClass('show');

    }).on('mouseleave', function() {
        console.log('leave');
        $('.map-object').removeClass('show');
        $(".name").removeClass('show');
    })
}

function equalsColumns() {
    var  maxHeight = -1;
    var  elems = document.getElementsByClassName("equal_height");

    for( var i = 0; i < elems.length; i++ ) {
        maxHeight = maxHeight > elems[i].offsetHeight ? maxHeight : elems[i].offsetHeight;
    }
    for( var i = 0; i < elems.length; i++ ) {
        elems[i].style.height = maxHeight + "px";
    }
}