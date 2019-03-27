$(document).ready(function () {
    let content_center = $('.content__center');

    function getImages(x) {
        mHeritageGoService.getPhotos({limit: 2, offset: x}).then(photos => {
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

    let window_content =   $('#content__center');

    $(window).bind('scroll', function() {
        console.log( $(window).scrollTop() );
        console.log(content_center.height() - $(window).height());
        if($(window).scrollTop() >= content_center.height() - $(window).height()) {
            // console.log( window_content.offset().top + window_content.outerHeight() - window.innerHeight-0.5);
            x += 2;
            getImages(x);
        }
    });
});
var content = $('.content'),
    header = $('.head');

$(content).clone().prependTo(header).addClass('blurred');

var blur = 'blur(.5em)';
$('.blurred').css({
    'background': '#fff',
    '-webkit-filter': blur,
    'filter': blur,
    'position': 'relative',
    'width': '100%',
});

$(document).scroll(function(){
    var scroll = $(this).scrollTop();
    $('.blurred').css({
        '-webkit-transform' : 'translateY(-'+scroll+50+'px)',
        'transform' : 'translateY(-'+scroll+'px)'
    });
})
