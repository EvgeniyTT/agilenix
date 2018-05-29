# Bearer-token based authorization API

+ docker
+ node.js
+ express.js
+ mongoDB
+ mongoose

## Installation

*You need to have docker preinstalled.*

Clone the repository.

## Starting the server

Run `docker-compose build`

After build is finished run `docker-compose up`

If everything is fine API should listen on localhost:3000

## Routes

+ /signin [POST] - request body { userId, password }, userId - email or phone in a format xxx-xxx-xxxx
+ /signup [POST] - request body { userId, password }, userId - email or phone in a format xxx-xxx-xxxx
+ /info [GET] - returns userId and user type.
+ /latency [GET] - returns ping to google.com
+ /logout [GET] - param 'all' : true/false, removes all or only provided bearer token
