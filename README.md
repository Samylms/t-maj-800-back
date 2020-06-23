# T-Maj-800

## Back

### Run the api server

npx nodemon rs server.js


### Connect to mongodb server
mongo admin -u root -p root

### Create the api database

use t-maj-api
db.init.insert({"name":"creation"})

### Create new db user

db.createUser(  
  {
    user: "devapi",
    pwd: "devapi",
    roles: [ { role: "readWrite", db: "t-maj-api" } ]
  }
)

### Connect to mongo for the api database

mongo -u devapi -p devapi --authenticationDatabase "t-maj-api"

# Routes

## Users routes

### Login route
     
### POST | /user/login
	
	{
        
    email:String,
		password:String,
		
	}

         

### GET | /users
### GET | /user/logout


### POST | /user/signup
	
	{
        pseudo:String,
        email:String,
        firstname:String,
        lastname:String,
		    password:String
	}
	
### GET | /user/:id_user
### PUT | /user/edit
	{
        pseudo:String,
        email:String,
        firstname:String,
        lastname:String,
		password:String
	}
	
### DELETE | /user/:id_user/delete

