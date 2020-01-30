const twitterData = require('../../data');

const createUser = async(knex, {username, handle, tweets}) => {
  const userId = await knex('users').insert({
    username,
    handle,
  }, 'id')

  let tweetsPromises = tweets.map(({content, date}) => {
    return createTweet(knex, {
      content,
      date,
      user_id: userId[0]
    })
  });

  return Promise.all(tweetsPromises);
};

const createTweet = (knex, data) => {
  return knex('tweets').insert(data);
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
