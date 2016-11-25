//= ../libs/jquery/dist/jquery.js
//= ../libs/fullpage.js/dist/jquery.fullpage.js
//= ../libs/mCustomScrollbar/jquery.mCustomScrollbar.min.js
//= ../libs/magnific-popup/dist/jquery.magnific-popup.js

function setObjectsWidth() {
    var oW = $(".map-main").width();
    $('.objects').css({ width: oW});
}
function showObject() {
    var object = $(".object"),
        objectName = $(".object .name"),
        objectMap = $(".map-object");

    object.each( function( i ) {
        for (i = 0; i < object.length; i++) {
            $(this).find(".building").hover(
                function () {
                    $(".map-object" + i).addClass('show');
                    $(object + i).find(".name").addClass('show');
                },
                function () {
                    $(objectMap + i).removeClass('show');
                    $(object + i).find(".name").removeClass('show');
                }
            );
        }

    });
}