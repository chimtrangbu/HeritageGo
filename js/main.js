$(function () {
    mHeritageGoService.getPhotos({limit: 5})
        .then(photos => {
            console.log(photos);
            let content_center = $('.content__center');
            let content_post = $('.content__center__post');
            $(photos).each(function () {
                mHeritageGoService.getPhoto(this)
                    .then(photo => {
                        console.log(photo);
                        let new_content = content_post.clone();
                        new_content.find('.photo_title').text(photo['title'][0]['content']);
                        new_content.find('.photo_taken_location').text(photo['area_name']);
                        // new_content.find('.photo_taken_time').text(photo['creation_time']);
                        new_content.find('.center__postBoard__image').attr("src", "http:" + photo['image_url']);
                        new_content.find('.photo_like_count').text(photo['like_count']);
                        new_content.find('.photo_comment_count').text(photo['comment_count']);
                        new_content.find('.photo_view_count').text(photo['view_count']);
                        new_content.removeAttr('hidden');
                        content_center.append(new_content)
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        })
        .catch(error => {
            console.log(error);
        });
});