#   DLC-Task-NodeJs-SocialNetwork


> Express WebApplication for Social network with REST API

- authentication via [JWT](https://jwt.io/)
- Create Posts with Hashtag
- Create Posts with User Mentioned
- Some Search Features
- routes are dine  via [express-routes-mapper](https://github.com/aichbauer/express-routes-mapper)
- linting via [eslint](https://github.com/eslint/eslint)
- integration tests running with [Jest](https://github.com/facebook/jest)

## Table of Contents

- [Install & Use](#install-and-use)
- [Folder Structure](#folder-structure)
- [DataBase Structure](#database-structure)
- [User Authentication](#user-auth)
- [Post Controller](#post-controller)
- [User Controller](#user-controller)

## Install and Use

Start by cloning this repository

```sh
# HTTPS
$ git clone https://github.com/abdolrhman/NodeJs-SocialNetwork
```

then 

```sh
# cd into project root
$ npm i
# to use mysql
$ npm i mysql2 -S
# start the api
$ npm start
```


## Folder Structure

This boilerplate has 4 main directories:

- api - for controllers, models, services, etc.
- config - for routes, database, etc.
- db - this is only a dir for the sqlite db, the default for NODE_ENV development
- test - using [Jest](https://github.com/facebook/jest)

## Controllers

### Auth Controller :-
- /public/login 
>for log user in
- /public/user 
>for register user 
- /private/post
> create a post
<br>
>body example:- 
<br>
>{
	"content": "hello world",
		"tags": ["world"],
	"mentioned_users": ["aahmedAli", "ali", "aswoany"]
}
- private/post/ByHashtags
>search posts by filtering hashtags.
- /private/myPosts
>view the posts he/she created.
- /private/posts/{userName}
>view an user posts
- /private/{userName}
>view an user profile
- /private/posts
>get recent posts





## Test

All test  uses [Jest](https://github.com/facebook/jest) and [supertest](https://github.com/visionmedia/superagent) for integration testing.


## Database Structure

User | Post | Tag | posts_tag | user_posts
------------ | ------------- | ------------- | ------------- | ------------- 
UserName | Content  | Name | post_id | post_id
firstName, lastName, emailName, password | ... | ... | tag_id | user_id

### Controller

> Note: those request are asynchronous, we use `async await` syntax.

>Converge Auth


### Models

Are usually automatically tested in the integration tests as the Controller uses the Models.


### npm start

- runs **nodemon watch task** for the all files conected to `.api/api.js`
- sets the **environment variable** `NODE_ENV` to `development`
- opens the db connection for `development`
- starts the server on 127.0.0.1:8000

### npm test

This command:

- runs `npm run lint` ([eslint](http://eslint.org/)) with the [airbnb styleguide](https://github.com/airbnb/javascript) without arrow-parens rule for **better readability**
- sets the **environment variable** `NODE_ENV` to `testing`
- creates the `database.sqlite` for the test
- runs `jest --coverage` for testing with [Jest](https://github.com/facebook/jest) and the coverage
- drops the `database.sqlite` after the test

## Implementation 
made for DLC. Task assessment
