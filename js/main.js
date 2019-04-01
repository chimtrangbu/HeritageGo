$(document).ready(function () {
    let content_center = $('.content__center');

    function getImages(x) {
        mHeritageGoService.getPhotos({limit: 5, offset: x}).then(photos => {
            console.log(photos);
            let content_post = $('#post__default');
            $(photos).each(function () {
                mHeritageGoService.getPhoto(this)
                    .then(photo => {
                        console.log(photo);
                        let new_content = content_post.clone();
                        new_content.find('.content__center__post__head__avatar').attr("src", "http:" + photo.account.picture_url);
                        new_content.find('.photo_title').text(photo.title[0].content);
                        new_content.find('.photo_taken_location').text(photo.area_name);
                        if (photo.capture_time)
                            new_content.find('.photo_taken_time').text(photo.capture_time);
                        else new_content.find('.photo_taken_time').text("N/A");
                        new_content.find('.center__postBoard__image').attr("src", "http:" + photo.image_url);
                        new_content.find('.photo_like_count').text(photo.like_count);
                        new_content.find('.photo_comment_count').text(photo.comment_count);
                        new_content.find('.photo_view_count').text(photo.view_count);
                        new_content.removeAttr('hidden');
                        content_center.append(new_content)
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        }).catch(error => {
            console.log(error);
        });
    }

    let x = 0;
    getImages(x);

    $(window).bind('scroll', function() {
        let scrollHeight = $(document).height();
        let scrollPosition = $(window).height() + $(window).scrollTop();
        if((scrollHeight - scrollPosition) / scrollHeight === 0) {
            x += 5;
            getImages(x);
        }
    });
});

let content = $('.content'),
    header = $('.head');

$(content).clone().prependTo(header).addClass('blurred');

let blur = 'blur(.5em)';
$('.blurred').css({
    '-webkit-filter': blur,
    'filter': blur,
    'position': 'relative',
    'width': '100%',
});

$(document).scroll(function(){
    let scroll = $(this).scrollTop();
    $('.blurred').css({
        '-webkit-transform' : 'translateY(-'+scroll+50+'px)',
        'transform' : 'translateY(-'+scroll+'px)',
        '-moz-transform'    : 'translateY(-' + scroll + 'px)',
    });
});


function stopShaking() {
    if ($(".content__center__post__head__detail__top__left__translate__icon").css("animation-play-state") === "running") {
        $(this).css("animation-play-state", "paused");
    } else {
        $(this).css("animation-play-state", "running");
    }
}


// $(".content__center__post__head__detail__top__left__language").on("click", function() {
//     console.log('hehe');
// });



// $("#hehe").click(function(){
//     console.log($(".content__center__post__head__detail__top__left__translate__icon").css("animation-play-state"))
//     if ($(".content__center__post__head__detail__top__left__translate__icon").css("animation-play-state") === "running") {
//         $(".content__center__post__head__detail__top__left__translate__icon").css("animation-play-state", "paused");
//     } else {
//         $(".content__center__post__head__detail__top__left__translate__icon").css("animation-play-state", "running");
//     }
// });

