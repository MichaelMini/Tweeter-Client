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
    var $inputLength = $(this).find('textarea').val().length
    var text = $('[action="/tweets"]').serialize();
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
  });
  var printAllTw = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    }).then(function(tweets) {
      tweets.forEach(function(eachTweet){
        createTweetElement(eachTweet);
      });
    });
  }

  var createTweetElement = function(data) {
    var avatarSmall = data.user.avatars.small;
    var name = data.user.name;
    var handle = data.user.handle;
    var content = data.content.text;
    var createdAt = data.created_at + ' days ago';

    var $tweet = $("<article>")
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
  // $('#tweets').append($el);
  // renderTweets(tweetdata);
  printAllTw();

  var $newTweet = $('.new-tweet');
  $('#compose').on('click', function toggleNewTweet() {
    $newTweet.slideToggle('slow').find('textarea').focus();
  });
});



// $('#tweets').find('article').clone().appendTo('section#tweets');
// console.log("hello");
