const twitterData = require('../../data');

const createUser = async(knex, {username, handle, tweets}) => {
  const userId = await knex('users').insert({
    username,
    handle,
  }, 'id')

  let tweetsPromises = await tweets.map(tweet => {
    return createTweet(knex, tweet, userId)
  });

  return Promise.all(tweetsPromises);
};

const createTweet = (knex, tweet, id) => {
  return knex('tweets').insert({
    content: tweet.content,
    date: tweet.date,
    user_id: id[0]
  });
};

exports.seed = async knex => {
  try {
    await knex('tweets').del()
    await knex('users').del()


    let userPromises = twitterData.map(data => {
      return createUser(knex, data)
    });

    return Promise.all(userPromises)
  } catch(error) {
    console.error(`Error seeding data: ${error}`)
  }
};
