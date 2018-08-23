```Node.Js sKeleton ```
-------------------
	
``Folder Structure``

`Server
	  app
	  	--Utility
	  	--Middleware
	  	--View
	  	--api
             --v1
             routes.js
	  config
	  database
	  public
	  storage
	  	-- logs
	  	-- cache
	  	-- session
	  	-- testing
	  globals.js
	  index.js
.env.example
server.js
index.js
package.json
README.md`
	
1. package.json 	

A lot of the behavior described in this document is affected by the config settings described in npm-config.
this will include name, version, script, description, keyword, licence etc.

3. .env.example file 

Replace with .env file, it is configuration file for the system

3. server.js 

Server file for include the .env file and index file

4. index.js

including the global configuration file and starting the server 


## Installation

*for newbies : Clone or download zip to your machine then hit this :

`npm install`

## Steps for generating the package for node Js

1. Create the Folder 
`mkdir foldername`

2. Clone the repository

git clone https://github.com/gupta-kamlesh-r/nodejs_skeleton.git
