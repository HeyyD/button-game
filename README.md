# Button Game
### Client
The client is build by using Angular. Angular requires Node.js version 8.x or 10.x. 
To check which version you have run `node -v` in terminal.
If you dont have Node.js, go to [nodejs.org](nodejs.org)

If you dont't have Angular CLI installed, install it globally by running `npm install -g @angular/cli`.

Move to the client folder `cd client/`

Install dependecies `npm install`

Now you can compile and run the client locally by running `ng serve`. Open your browser in `http://localhost:4200`.

### Server
The server is created by using Node.js and Express. If you dont have Node.js, go to [nodejs.org](nodejs.org).
Server is running in Heroku in `https://button-game-server.herokuapp.com/`.

#### If you want to run the server locally:

Move to the server folder `cd server/`

Install dependecies `npm install`

Run the server locally `node dist/index.js`. The server is now running in `http://localhost:8080`
