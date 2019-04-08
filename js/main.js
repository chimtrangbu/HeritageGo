
// function visibility the password when click lock icon
function visibilityPassword() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
    document.getElementById("lock").className =
      "fas fa-unlock-alt btn-password prefix";
  } else {
    x.type = "password";
    document.getElementById("lock").className =
      "fas fa-lock btn-password prefix";
  }
}

// function add a new photo to page
function addImage(image, content_post, content_center) {
  // get and fix data in post
  mHeritageGoService
    .getPhoto(image)
    .then(photo => {
      console.log(photo)
      let new_content = content_post.clone();
      new_content
        .find(".content__center__post__head__avatar")
        .attr("src", "http:" + photo.account.picture_url);
      new_content
        .find(".content__center__post__head__detail__top__left")
        .text(photo.title[0].content);
      new_content
        .find(".content__center__post__head__detail__bottom__position__detail")
        .text(photo.area_name);
      new_content
        .find(".content__center__post__image")
        .attr("src", "http:" + photo.image_url + '?size=medium');
      if (photo.capture_time)
        new_content
        .find(".content__center__post__head__detail__bottom__time__detail")
        .text(photo.capture_time);
      else
        new_content
        .find(".content__center__post__head__detail__bottom__time__detail")
        .text("N/A");
      new_content
        .find(".content__center__post__reaction__left__love__count")
        .text(photo.like_count);
      new_content
        .find(".content__center__post__reaction__left__comment__count")
        .text(photo.comment_count);
      new_content
        .find(".content__center__post__reaction__left__camera__count")
        .text(photo.view_count);

      // clone language tag
      lang = $('#defaultLang').clone()

      // set and add new language to dropdown list
      listLanguages = navigator.languages
      for (i = 0; i < listLanguages.length; i++) {
        if (listLanguages[i].length == 2) {
          lang.text(alpha1_alpha3[listLanguages[i]])
          lang.removeAttr('style')
          new_content.find('.dropdown-menu').append(lang[0].outerHTML)
        }
      }

      // catch event click on tag has class .dropdown-item and show the experience for user
      new_content.find('.dropdown-item').on('click', function () {
        $('.content__center__post__head__detail__top').find('.show').each(function () {
          $(this).removeClass('show')
        })
        if (!new_content.find('.trans').hasClass('showItem')) {
          changeInterface(new_content)
        }
        let locale = $(this).text();
        new_content.find('.trans').text(locale)

      })

      // catch event enter to post data to server by api
      new_content.find('.title').on('keypress', function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
          caption = new_content.find('.title').val()
          locale = new_content.find('.trans').text()
          new_content.find('.trans').text('')
          photoId = photo.photo_id
          changeInterface(new_content)
          mHeritageGoService.suggestPhotoCaption(photoId, caption, locale).catch(error => {
            console.log(error);
          })
        }
      })

      // remove hidden and id of post except post_default
      new_content.removeAttr("hidden");
      new_content.removeAttr("id");

      // catch event click on tag has class .post__icon and show the experience for user
      $(new_content.find('.post__icon')).on("click", function () {
        var obj = $(this).css('animation-play-state')
        if (obj == 'running') {
          $(this).css('animation-play-state', 'paused')
        } else {
          $(this).css('animation-play-state', 'running')
        }
      })

      // add new post to page
      content_center.append(new_content);
    })
    .catch(error => {
      console.log(error);
    });
}

// function hide and show add translate feature
function changeInterface(new_content) {
  new_content.find('.post__icon').toggleClass('showItem')
  new_content.find('.content__center__post__head__detail__top__left').toggleClass('showItem')
  new_content.find('.title').toggleClass('showItem')
  new_content.find('.trans').toggleClass('showItem')
}

// function get a new photo from api
function getImages(turn) {
  content_center = $(".content__center");
  mHeritageGoService
    .getPhotos({
      limit: 5,
      offset: turn
    })
    .then(photos => {
      console.log(photos);
      let content_post = $("#post__default");
      $(photos).each(function () {
        addImage(this, content_post, content_center);
      });
    })
    .catch(error => {
      console.log(error);
    });
}

// function catch event click of document for eperience user
$(document).on('click', function (event) {
  var list = $($(this).find('.content__center__post'))
  var target = $(event.target).parents()
  for (i = 0; i < list.length; i++) {
    if ($(list[i]).find('.post__icon').css('animation-play-state') == 'paused') {
      $('.post__icon').css('animation-play-state', 'running');
    }
    if (!$(target[target.length - 5]).is(list[i]) && $(list[i]).find('.trans').hasClass('showItem')) {
      changeInterface($(list[i]));
    }
  }
})

// function catch event scroll of window for eperience user
function scroll(turn) {
  $(window).bind("scroll", function () {
    $('.post__icon').css('animation-play-state', 'running')
    $('.content__center__post__head__detail__top').find('.show').each(function () {
      $(this).removeClass('show')
    })
    var list = $($(document).find('.content__center__post'))
    for (i = 0; i < list.length; i++) {
      if ($(list[i]).find('.trans').hasClass('showItem')) {
        changeInterface($(list[i]));
        break;
      }

    }
    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    if (scrollHeight - scrollPosition === 0) {
      turn += 5;
      getImages(turn);
    }
  });
}

// function for blur content 
function blurContent() {
  var content = $(".content");
  var header = $(".head");
  $(content)
    .clone()
    .prependTo(header)
    .addClass("blurred");

  var blur = "blur(8px)";
  $(".blurred").css({
    background: "#fff",
    "-webkit-filter": blur,
    filter: blur,
    width: "100%",
    position: "relative"
  });

  $(document).scroll(function () {
    var scroll = $(window).scrollTop();
    $(".blurred").css({
      "-webkit-transform": "translateY(-" + scroll + "px)",
      transform: "translateY(-" + scroll + "px)"
    });
  });
}

// call blur content function 
blurContent();

// make document ready 
$(document).ready(function () {
  var turn = 0;
  getImages(turn);
  scroll(turn);
  
});