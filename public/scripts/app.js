/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 // Test / driver code (temporary). Eventually will get this from the server.





 // var $tweet = createTweetElement(tweetData);

 // // Test / driver code (temporary)
 // console.log($tweet); // to see what it looks like
 // $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

$(function () {
  $('[action="/tweets"]').on('submit', function (sendTw) {
    sendTw.preventDefault();
    let $textarea = $(this).find('textarea');
    let $inputLength = $textarea.val().length;
    let text = $('[action="/tweets"]').serialize();
    if ($inputLength === 0) {
      alert('Please type in the box below the "Compose Tweet"');
      return
    }
    if ($inputLength > 140) {
      alert('You have typed over the 140 text limit.');
      return
    }
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize()
    }).then(function () {
      printAllTw();
    });
    $textarea.val('');
  });
  let printAllTw = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    }).then(function(tweets) {

      tweets.forEach(function(eachTweet){
        createTweetElement(eachTweet);
      });

      toggleHover();
    });
  }

  let createTweetElement = function(data) {
    let avatarSmall = data.user.avatars.small;
    let name = data.user.name;
    let handle = data.user.handle;
    let content = data.content.text;
    let createdAt = new Date(data.created_at);

    createdAt = timeSince(createdAt) + ' ago';

    let $tweet = $("<article>")
      .addClass("tweet")
      .append($(`<header>`).addClass(`tw-header`))
      .append($(`<section>`).addClass(`tw-sec`))
      .append($(`<footer>`).addClass(`tw-footer`))
      .prependTo('#tweets');

    $tweet.find('header')
      .append($(`<img>`).addClass(`user-tb`))
      .append($(`<p>`).addClass(`name`))
      .append($(`<p>`).addClass(`handle`));

    $tweet.find(`.user-tb`).attr('src', avatarSmall);
    $tweet.find(`.name`).text(name);
    $tweet.find(`.handle`).text(handle);
    $tweet.find(`.tw-sec`).append('<p>').text(content);
    $tweet.find(`.tw-footer`).append('<p>').text(createdAt).append(`<div class='icons'>`);

    $iconsFooter = $tweet.find('.icons');
    $iconsFooter.append($('<i>').addClass(`fa fa-heart`).attr(`aria-hidden`, `true`))
                .append($('<i>').addClass(`fa fa-retweet`).attr(`aria-hidden`, `true`))
                .append($('<i>').addClass(`fa fa-flag`).attr(`aria-hidden`, `true`));
  }
  printAllTw();

  let $newTweet = $('.new-tweet');
  $('#compose').on('click', function toggleNewTweet() {
    $newTweet.slideToggle('slow').find('textarea').focus();
  });

  let toggleHover = function() {
    $('#tweets .tweet').hover(
           function(){ $(this).toggleClass('hover') }
    )
  }

  function timeSince(date) {
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        return interval + " year" + ((interval>1)?'s':'');
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval + " month" + ((interval>1)?'s':'');
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval + " day" + ((interval>1)?'s':'');
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval + " hour" + ((interval>1)?'s':'');
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval + " minute" + ((interval>1)?'s':'');
    }
    return Math.floor(seconds) + " second" + ((seconds>1)?'s':'');
  }

});

























