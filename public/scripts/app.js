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
// console.log($('[action="/tweets"]')[0]);
  $('[action="/tweets"]').on('click', function (sendTw) {
    sendTw.preventDefault();
    var test = $('[action="/tweets"]').serialize();
    console.log(test);
  });

  $.ajax({
    url: '/tweets',
    method: 'GET'
  }).then(function(tweets) {
    tweets.forEach(function(eachTweet){
      createTweetElement(eachTweet);
    });
  });

  // var renderTweets = ;

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
      .appendTo('#tweets');

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
});
// console.log($tweet);


// $('#tweets').find('article').clone().appendTo('section#tweets');
// console.log("hello");
