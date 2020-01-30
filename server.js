const express = require('express');
// requires in the express framework and assigns to a constant
const cors = require('cors');
// requires in cors library to handle/allow Cross-Origin-Requests and assigns to a constant
const bodyParser = require('body-parser');
// requires in body-parser library to parse request objects that contain a json body and 
// assigns to a constant
const app = express();
// invokes express and assigns to a constant
const environment = process.env.NODE_ENV || 'development';
// assigns a value to the constant that may change depending on if it's production or development
const configuration = require('./platform/knexfile')[environment];
// requires in the appropriate knex config depending on the value of the environment 
// and assigns to a constant
const database = require('knex')(configuration);
// requires in the correct database depending on environment + knex config 
// and assigns to a constant

app.use(cors());
// invokes cors and tells app to use it for all functions
app.set('port', process.env.PORT || 3000);
// sets the port that the server will be running from, which will either be determined 
// by heroku or default to PORT 3000
app.get('/api/v1/tweets', async (req, res) => {
// route handler for GET request to '/api/v1/tweets' path, designated as async
  try {
    const tweets = await database('tweets').select();
    // async call to db, specifically the 'tweets' table, gets all records, and assigns to constant
    res.status(200).json(tweets)
    // returns the response object with a status code 200, and the constant tweets, stringified
  } catch(error) {
    res.status(500).json({ error });
    // in the event that no resources could be found a 500 status code is sent indicating 
    // an internal server error occurred
  }
});

app.get('/api/v1/tweets/:id', async (req, res) => {
// route handler for GET requests to '/api/v1/tweets/:id' path, designated as async
  try {
    const tweet = await database('tweets').select().where('id', req.params.id)
    // async call to db, specifically the 'tweets' table, gets a specific tweet based on 
    // the id of the request parameters, and assigns to a constant
    res.status(200).json(tweet)
    // returns the response object with a status code 200, and the constant tweet, stringified
  } catch(error) {
    res.status(500).json({ error })
    // in the event that no resources could be found a 500 status code is sent indicating 
    // an internal server error occurred
  }
})

app.get('/api/v1/users', async (req, res) => {
// route handler for GET request to '/api/v1/users' path, designated as async
  try {
    const users = await database('users').select();
    // async call to db, specifically the 'tweets' table, gets all records, and assigns to constant
    res.status(200).json(users)
    // returns the response object with a status code 200, and the constant users, stringified
  } catch(error) {
    res.status(500).json({ error });
    // in the event that no resources could be found a 500 status code is sent indicating
    //  an internal server error occurred
  }
});

app.get('/api/v1/users/:id', async (req, res) => {
// route handler for GET request to '/api/v1/users/:id' path, designated as async
  try {
    const user = await database('users').select().where('id', req.params.id)
    // async call to db, specifically the 'users' table, gets a specific user based on 
    // the id of the request parameters, and assigns to a constant
    res.status(200).json(user)
    // returns the response object with a status code 200, and the constant user, stringified
  } catch(error) {
    res.status(500).json({ error })
    // in the event that no resources could be found a 500 status code is sent indicating
    //  an internal server error occurred
  }
})

app.get('/api/v1/users/:id/tweets', async (req, res) => {
// route handler for GET request to '/api/v1/users/:id/tweets' path, designated as async
  try {
    const tweets = await database('tweets').select().where('user_id', req.params.id)
    // async call to db, specifically the 'tweets' table, gets all records that match the user_id of the request object's params, and assigns to constant
    res.status(200).json(tweets)
    // returns the response object with a status code 200, and the constant tweets, stringified
  } catch(error) {
    res.status(500).json({ error })
    // in the event that no resources could be found a 500 status code is sent indicating an internal server error occurred
  }
})

app.post('/api/v1/users', bodyParser.json(), async (req, res) => {
// route handler for POST request to 'api/v1/users' path, contains middleware bodyParser
//  to parse the json'd body of request object, designated as async
  const user = req.body;
// assigns the body of the request object to a constant
  for (let requiredParameter of ['username', 'handle']) {
  // for loop that iterates over the array of required parameters for the response object's body
    if (!user[requiredParameter]) {
    // takes each requiredParamater and checks to see if it exists on response body(user constant)
      return res
        .status(422)
        .reject({ error: `Expected format: { username: <String>, handle: <String> }. You're missing a ${requiredParameter} property`});
      // if it does not contain both parameters response object rejects with 422 status code indicating
      //  an unprocessable entity, with an error message indicating what parameter is missing
      //  from the request body object
    }
  }
// if response object does contain all requiredParameters function continues on
  try {
    const id = await database('users').insert(user, 'id');
    // async call to db, that creates a new record on the "users" table, and returns the newly created id
    //  for that record
    res.status(201).json({ id })
    // response object is returned with a 201 status code, indicating request has been fulfilled
    //  and new resource has been created,with json'd id as the response body
  } 
  
  catch(error) {
    res.status(500).json({ error });
    // in the event that no resources could be found a 500 status code is sent indicating
    //  an internal server error occurred
  }
});

app.post('/api/v1/tweets', bodyParser.json(), async (req, res) => {
// route handler for POST request to 'api/v1/tweets' path, contains middleware bodyParser to parse the json'd body of request object, designated as async
  const tweet = req.body;
// assigns the body of the request object to a constant
  for (let requiredParameter of ['content', 'id']) {
   // for loop that iterates over the array of required parameters for the response object's body
    if (!tweet[requiredParameter]) {
    // takes each requiredParamater and checks to see if it exists on response body(user constant)
      return res
        .status(422)
        .send({ error: `Expected format: { content: <String>, date: <String> }. You're missing a ${requiredParameter} property`});
        // if it does not contain both parameters response object rejects with 422 status code indicating
        //  an unprocessable entity, with an error message indicating what parameter is missing
        //  from the request body object
    }
  }

  try {
    await database('tweets').insert({
      content: tweet.content,
      date: new Date(),
      user_id: tweet.id
    });
    // async call to db, that creates a new record on the "tweets" table, and returns
    //  the newly created tweet
    res.status(201).json({ tweet })
    // response object is returned with a 201 status code, indicating request has been fulfilled
    //  and new resource has been created,with json'd tweet as the response body

  } 
  
  catch(error) {
    res.status(500).json({ error });
    // in the event that no resources could be found a 500 status code is sent indicating an internal server error occurred
  }
});

app.delete('/api/v1/users/:id', async (req, res) => {
// route handler for DELETE requests to '/api/v1/users/:id' path, designated as async
  try {
    await database('users').select().where('id', req.params.id).del()
    // async call to db, that selects record that matches the request object's param of id, and deletes the record
    res.status(204).send('Account has been deleted')
    // response object is returned with a 204 status code, indicating No Content, and message that account has been deleted
  } catch(error) {
    res.status(500).json({ error })
    // in the event that no resources could be found a 500 status code is sent indicating an internal server error occurred
  }
});

app.delete('/api/v1/users/:id/tweets/:tweet_id', async (req, res) => {
// route handler for DELETE requests to '/api/v1/users/:id/tweets/:tweet_id' path, designated as async
  try {
    await database('tweets').select().where('id', req.params.tweet_id).del()
    // async call to db, that selects record that matches the request object's param of tweet_id, and deletes the record
    res.status(204).send('Tweet has been deleted')
    // response object is returned with a 204 status code, indicating No Content, and message that tweet has been deleted
  } catch(error) {
    res.status(500).json({ error })
    // in the event that no resources could be found a 500 status code is sent indicating an internal server error occurred
  }
});

app.get('*', (req, res) => {
// route handler for ALL other routes
  res
  .status(404)
  .send('404: Not found')
  // returns status code 404, indicating resource was not found and renders a message of '404: Not found' in browser
});

app.listen(app.get('port'), () => {
  // invokes event listener on the port this server is running from
  console.log(`Server is listening on localhost:${app.get('port')}...`)
  // console message indicating that the server is listening on dynamic port
});