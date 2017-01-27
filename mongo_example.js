'use strict';

// const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb://localhost:27017/tweeter';

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  // ==>  We have a connection to the "test-tweets" db,
  //      starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // ==>  In typical node-callback style, any program logic that needs to the connection needs to be invoked from within here.
  // Another way to say: this is an "entry point" for a database-connected application!

  // ==> Let's "get all the tweets". In Mongo-speak, we "find" them.
  // 4. db.collection('tweets').find({}, (err, results) => {
  //   // lazy error handling:
  //   if (err) throw err;

  //   // 3. ==> We could instead just slurp the items into an array:
  //   results.toArray((err, resultsArray) => {
  //     if (err) throw err;

  //     console.log('results.toArray:', resultsArray);
  //   });

  //   // 2. ==> So we Read The Fantastic Manual, right?

  //   // ==> We can iterate on the cursor to get results, one at a time:
  //   // console.log('for each item yielded by the cursor:');
  //   // results.each((err, item) => console.log('  ', item));

  //   // 1. ==> Fair warning: This is going to log a lot of stuff...
  //   // console.log('find result: ', result);
  //   // console.log('type of find result: ', typeof results);

  //   // ==> This is inside this callback now. Think about it: This is now the "end of the program", right?.
  //   db.close();
  // })

  // 5. db.collection('tweets').find().toArray((err, results) => {
  //   if (err) throw err;

  //   console.log('results array: ', results);

  //   db.close();
  // })

  function getTweets(callback) {
    db.collection('tweets').find().toArray((err, tweets) => {
      if (err) {
        return callback(err);
      }
      callback(null, tweets);
    });
  }

  // ==> Later it can be invoked. Remember even if you pass `getTweets` to another scope, it still has closure over 'db', so it will still work. Yay!

  getTweets((err, tweets) => {
    if (err) throw err;

    console.log('Logging each tweet:');
    for (let tweet of tweets) {
      console.log(tweet);
    }

    db.close();
  });

  // ==> At the end, we close the connection:
});