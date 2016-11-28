
//variables
var wH = $(window).height(),
    wW = $(window).width(),
    ua = navigator.userAgent,
    touchendOrClick = (ua.match(/iPad|iPhone|iPad/i)) ? "touchend" : "click",
    tapOrClick = (ua.match(/iPad|iPhone|iPad/i)) ? "tap" : "click",
    deviceAgent = navigator.userAgent.toLowerCase(),
    agentID = deviceAgent.match(/(iphone|ipod|ipad)/);

$(window).on('resize', function() {
    var wH = $(window).height(),
        wW = $(window).width(),
        sL = $('.section-left').outerWidth();
    $('.mt').each(function() { $(this).css({ marginTop: -(($(this).height())/2) + 'px'}); });
    $('.ml').each(function() { $(this).css({ marginLeft: -(($(this).outerWidth())/2) + 'px'}); });
    $('.wH').css({height: wH + 'px'});

    $('.section-right').css({
        paddingLeft: sL
    });
    if (wW < 880 ) {
        $('.js-scroller-icon').css({
            left: sL + 40
        })
    }
    else {
        $('.js-scroller-icon').css({
            left: sL + 60
        })
    }
}).trigger('resize');


$(window).on('load', function() {
    $('html').addClass('loaded');
});

$(document).ready(function() {
    $('#content-scroll').fullpage({
        controlArrows: false,
        paddingTop: '0',
        paddingBottom: '0',
        keyboardScrolling: false,
        scrollingSpeed: 1000,
        easingCss3: 'ease',
//    anchors: ['intro', 'panorama', 'collections', 'media',  'events', 'contacts'], //dpni
        anchors: ['intro', 'panorama', 'info', 'media', 'news', 'feedback',  'contacts'], //all gmii
        menu: '#menu',
        // normalScrollElements: '.mfp-wrap',
        resize : false,
//    autoScrolling: false,
        verticalCentered: false,
        onLeave: function(index, nextIndex, direction){
            var scroller = $('.js-scroller-icon');
            if(direction =='down'){
                scroller.addClass('down-animation');
            }
            else if(direction == 'up'){
                scroller.addClass('up-animation');
            }
            setTimeout(function(){
                scroller.removeClass('up-animation').removeClass('down-animation');
            }, 1000);
        },
        afterLoad: function(anchorLink, index){
            if(anchorLink == 'contacts'){
                $('#map').show().siblings('.spinner').addClass('hide')
            }
            else {
                $('#map').hide().siblings('.spinner').removeClass('hide')
            }
            $('.js-scroller-icon i').addClass("up-down-animation");
            //
            // if(anchorLink == 'intro'){
            //     vid.play();
            // }
            // else {
            //     vid.pause();
            // }
        }
    });

    $('.popup-video').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        enableEscapeKey: false,
        callbacks: {
            ajaxContentAdded: function() {
                $.fn.fullpage.setAllowScrolling(false);
                $('.ajax-modal').find('.mfp-close').on('click', function (e) {
                    e.preventDefault();
                    $.magnificPopup.close();
                    $.fn.fullpage.setAllowScrolling(true);
                });
            }
        }
    });
    // $('#map').on('mouseenter', function() {
    //     $.fn.fullpage.setAllowScrolling(false);
    //
    // }).on('mouseleave', function() {
    //     $.fn.fullpage.setAllowScrolling(true);
    // });
    $('a[data-ajax-on-modal]').magnificPopup({
        type: 'ajax',
        tLoading: '<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>',
        mainClass: 'ajax-modal',
        closeOnBgClick: false,
        enableEscapeKey: false,

        callbacks: {
            ajaxContentAdded: function() {
                $.fn.fullpage.setAllowScrolling(false);
                $('.gallery').slick({
                    arrows: false,
                    dots: true,
                    infinite: true,
                    slidesToShow: 1,
                    autoplay: true,
                    autoplaySpeed: 4000,
                    speed: 1000,
                    fade: true
                });
                $('.ajax-modal').find('.mfp-close').on('click', function (e) {
                    e.preventDefault();
                    $.magnificPopup.close();
                    $.fn.fullpage.setAllowScrolling(true);
                });
            }
        }
    });
    (function() {

        var app = {

            initialize : function () {
                this.setUpListeners();
            },

            setUpListeners: function () {
                $('form#feedback-form').on('submit',app.submitForm);
                $('form#feedback-form').on('keydown', '.has-error', app.removeError);
            },

            submitForm: function (e) {
                e.preventDefault();

                var form = $(this);
                submitBtn = form.find('button[type="submit"]');


                if ( app.validateForm(form) === false) return false;

                var str = form.serialize();

                // против повторного нажатия
                submitBtn.attr({disabled: 'disabled'});

                $.ajax({
                    type: "POST",
                    url: "/inc/feedback.php",// обычно тут php файл
                    data: str
                }).done(function(msg) {
                    var message = $('.message');
                    if(msg == 'OK') {
                        result = '<div class="success-msg">Спасибо, Ваша заявка успешно принята<br>Мы свяжемся с Вами в ближайщее время</div>';
                        form.html(result);
                    } else {
                        message.html(msg);
                    }
                }).always(function(){
                    submitBtn.removeAttr("disabled");
                })
            },


            validateForm: function (form){

                var inputs = form.find('input.validate'),
                    textareas = form.find('textarea.validate'),
                    valid = true;


                $.each(inputs, function(index, val) {
                    var input = $(val),
                        val = input.val(),
                        inputGroup = input.parents('.input-group'),
                        err = inputGroup.find('.error-msg'),
                        textError = ' (пожалуйста, заполните это поле)';

                    if(val.length === 0){
                        input.addClass('has-error').removeClass('has-success');
                        err.html(textError);
                        valid = false;
                    }else{
                        input.removeClass('has-error').addClass('has-success');
                        err.html('');

                    }
                });

                $.each(textareas, function(index, val) {
                    var textarea = $(val),
                        val = textarea.val(),
                        inputGroup = textarea.parents('.input-group'),
                        textError = ' (пожалуйста, не отправляйте пустое сообщение)',
                        err = inputGroup.find('.error-msg');

                    if(val.length === 0 || val.length < 1){
                        textarea.addClass('has-error').removeClass('has-success');
                        err.html(textError);
                        valid = false;
                    } else{
                        textarea.removeClass('has-error').addClass('has-success');
                        err.html('');
                    }
                });

                return valid;

            },


            removeError: function() {
                $(this).removeClass('has-error').find('input');
                $(this).removeClass('has-error').find('textarea');
            }

        }

        app.initialize();

    }());

    setObjectsWidth();
    showObject();
    equalsColumns();
});


$(".scroller").mCustomScrollbar({
    theme:"light-thin",
    scrollbarPosition: "outside",
    scrollInertia:150,
    contentTouchScroll: true,
    advanced:{ updateOnContentResize: true}
});

function toggleMenu() {
    $('body').toggleClass('menu-opened');
    $('#sidebar').toggleClass('animate');
}

function closeMenu() {
    $('body').removeClass('menu-opened');
    $('#sidebar').removeClass('animate');
}

$('.btn-open-menu').on(touchendOrClick, function() {
    toggleMenu();
});

$('#content').on(touchendOrClick, function() {
    closeMenu()
});

$('#sidebar menu a').on(touchendOrClick, function() {
    setTimeout(function() {
        closeMenu()
    }, 1200)
});




/*
$.ajaxSetup({cache:false});

var ajax = $("#ajax-content"),
    ajaxList = $("#ajax-content-list"),
    ajaxItem = $("#ajax-content-item"),
    ajaxTitle = $('#article_title'),
    ajaxCatalogue = $('#level-1-catalogue'),
    article = '.collections-article',
    list = '.collections-list',
    item = '.collection-item';

$("#level-1 a").on(touchendOrClick, function(e){

    var content = $(this).data('content'),
        title = $(this).text(), r_image = $(this).data('rel');

    //console.log(r_image);
    e.preventDefault();
    $('#level-1').hide();

    if(r_image=="") {
        $('#level-1-list').hide();
        //$("#ajax-content-list").show();
    } else {
        $('#level-1-list').css("background-image",'url('+r_image+')');
        $("#ajax-content-list").hide().parents('.section-right-inner').removeClass('list-opened');
    }

    ajax.load(content + ' ' + article, function() {
        ajax.find('#article_title').text(title);
        var collist =  ajax.find('#article_title').data('collist');
        if(collist == "yes") {
            ajaxTitle.on('click',showImage);
            ajaxTitle.css('cursor','pointer');
            ajaxCatalogue.show();
            showList()
        } else {
            ajaxTitle.off('click',showImage);
            ajaxTitle.css('cursor','default');
            ajaxCatalogue.hide();

        }

    });

    ajaxList.load(content + ' ' + list, function() {

        ajaxList.find('a').on('click', function() {
            var image = $(this).data('image'),
                title = $(this).find('.img-title').text(),
                author = $(this).data('author'),
                time = $(this).data('time'),
                material = $(this).data('material'),
                sizes = $(this).data('sizes'),
                more = $(this).data('more');

            ajaxItem.addClass('show').show().load(content + ' ' + item, function() {

                ajaxItem.find('#collection-item-image').attr('src', image);
                ajaxItem.find('#collection-item-title').text(title);
                addDesc(author); addDesc(time); addDesc(material); addDesc(sizes);
                ajaxItem.find('#collection-item-more').attr('href', more);

                countImgSize();
                $(window).resize(function() {
                    countImgResize()
                });
            });

        });
    });

});

function addDesc(data) {
    if (data != null) {
        ajaxItem.find('#collection-item-description').append('<li>'+ data +'</li>');
    }
}

function countImgSize() {
    var containerHeight = $('#ajax-img-container').outerHeight(),
        img = $('#collection-item-image');
    img.on('load', function() {
        var imgWidth = img.width(),
            imgHeight = img.height();
        if(imgHeight > containerHeight) {
            img.css({
                height: containerHeight
            })
        }
    });
}

function countImgResize() {
    var containerHeight = $('#ajax-img-container').outerHeight(),
        img = $('#collection-item-image');
    var imgWidth = img.width(),
        imgHeight = img.height();
    if (imgWidth <= imgHeight) {
        img.css({
            height: containerHeight
        })
    }
}

function showImage() {
    $('#level-1-list').show();
    $("#ajax-content-list").removeClass('show').hide();
}

function showList() {
    $('#level-1-list').hide();
    ajaxCatalogue.hide();
    ajaxCatalogue.off('click', showList);
    $("#ajax-content-list").addClass('show').show().parents('.section-right-inner').addClass('list-opened');
}

function closeImage() {
    $("#ajax-content-item").removeClass('show').empty().hide();
}

function levelUp() {
    $('#level-1').show();
    $('#level-1-list').empty().removeAttr('style');
    $("#ajax-content").empty();
    ajaxCatalogue.hide();
    ajaxCatalogue.off('click', showList);
    $("#ajax-content-list").empty().removeAttr('style').removeClass('show').parents('.section-right-inner').removeClass('list-opened');;
    $("#ajax-content-item").removeClass('show').hide().empty();
}
*/