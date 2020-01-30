# BYOB
Build Your Own Backend 

# API ENDPOINTS - DOCUMENTATION

| Api Paths             | Request       | Response                                         |
| --------------------  |:-------------:| ------------------------------------------------:|
| '/api/v1/users'       | **GET**           |   **An array of all users**. Ex:```[{"id": 211,"username": "Meow Wolf","handle": "MeowWolf","created_at": "2020-01-30T05:17:27.414Z","updated_at": "2020-01-30T05:17:27.414Z"},...```|
| 'api/v1/tweets'       | **GET**           |  **An array of all tweets**.  Ex:``` [{"id": 243,"content": "Fall in love with some activity, and do it! Nobody ever figures out what life is all about, and it doesnt matter. Explore the world. Nearly everything is really interesting if you go into it deeply enough!","date": "1/25/20","user_id": 217},...```|
| 'api/v1/users/:id' .  | **GET**           |   **An array of a specific user** Ex:```[{"id": 241,"username": "Fluffykins","handle": "DaRealFluffykins","created_at": "2020-01-30T15:33:59.023Z","updated_at": "2020-01-30T15:33:59.023Z"}]```|
| 'api/v1/users/:id/tweets| **GET**         | **An array of all the tweets of a specific user** Ex:```[{"id": 366,"content": "Cats may have been a box office disaster, but wait until you see my litter box! mewmewmew","date": "2020-01-30T09:16:16.844-07:00","user_id": 241}]```|
| 'api/v1/tweets/:id'     | **GET**         | **An array of a specific tweet** Ex: ```[{"id": 42,"content": "because a cat's the only cat, who KNOWS where it's at", "date": 2020-01-30T09:16:16.844-07:00,"user_id": "241"}]```|
| 'api/v1/users'          | **POST** *Must include username(string) and handle(string) in body of request object Ex:* ```{username: 'Jarvis Blargus', handle:'JarBlar'```| **An object of newly created user id** Ex:```{"id": [244]}```|
| 'api/v1/tweets'         | **POST**  *Must include content(string) and id(string) in body of request object Ex:* ```{content:'Spimoni!', id:'244'}```| **An object of newly created tweet** Ex:```{"tweet": {"content": "Spimoni","id": "244"}}```|
| 'api/v1/users/:id       | **DELETE**      | **A text response** Ex: 'Account has been deleted'|
| 'api/v1/tweets/:id      | **DELETE**      | **A test response** Ex: 'Tweet has been deleted' |


## Overview 


(Sprint Board (GithubProjects))[https://github.com/JamesRexMiller4/BYOB/projects/1]
