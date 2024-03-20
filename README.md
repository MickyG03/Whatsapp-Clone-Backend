# Whatsapp Clone Web Application: Backend
---

Welcome to the WhatsApp Clone Web Application Backend repository! This repository contains the backend code for building a feature-rich messaging platform similar to WhatsApp. This project aims to replicate the functionality of WhatsApp, offering real-time messaging, video calls, file sharing, group chats, and various other features. The backend is built using Node.js and Express.js, with MongoDB as the database.

## Features

- Authentication: Implement secure login and registration processes using JSON Web Tokens (JWT).
- Real-time messaging: Enable real-time communication between users using Socket.IO.
- Chats: Utilized NoSQL (as message formats can vary, and it is scalable for realtime applications where number of users can be large) for storing conversation between user and groups.
- Live video stream for calls: Enjoy face-to-face communication with the integration of video calls, complete with ringing components and sounds using sockets and simple-peers.
- Typing/Online Status: Used Socket Server for emitting and receiving synchronous status updates.
- Logging: Utilize Winston and Logger for logging to monitor and troubleshoot application behavior.
- Validation: Validate user input using the Validator library.
- Error Handling: Handle errors gracefully using HTTP error middleware.
- Advanced Search: Easily find contacts with email or username.

![output-9](https://github.com/MickyG03/Whatsapp-Clone-Backend/assets/76037226/de318f22-4487-45a0-afc0-4c46c0e2404d)


## Getting Started
To get started with Whatsapp Clone, follow the steps:

#### 1. Clone Frontend and Backend repository: 
Frontend:
```sh
git clone "https://github.com/MickyG03/Whatsapp-Clone-Frontend"
```
Backend:
```sh
git clone "https://github.com/MickyG03/Whatsapp-Clone-Backend"
```
#### 2. Node JS and NPM installation: 
[Node Js]: Make sure you have Node JS and NPM package manager installed on your system.

#### 3. Install Yarn: 
While both NPM and Yarn are viable options, I lean towards Yarn due to its parallel installation feature, which ultimately saves time.
```sh
npm install --global yarn
```

#### 4. Install Packages:
```sh
cd "Whatsapp-Clone-Backend"
yarn install
```

#### 5. Setup MongoDB:
- Create account on [MongoDB-Atlas].
- Create a cluster and get the connection sring
- To connect and verify schemas on desktop, download [MongoDB-Compass] on your system and use connection string to connect to the cloud database of Atlas .

#### 6. Create .env file:
Create .env file in the frontend folder and add these fields:
```sh
PORT = {integer for your port}
NODE_ENV = development (Can be changed to production when you want to deploy)
DATABASE_URL= databse conenection url from step 5.
ACCESS_TOKEN_SECRET = {generate an access token for JWT}
REFRESH_TOKEN_SECRET = {generate a refresh token for JWT}
DEFAULT_PICTURE={source for default image for user}
DEFAULT_STATUS={Example: Hey there! I am using Whatsapp}
DEFAULT_GROUP_PICTURE={source for default image for group chats}
CLIENT_ENDPOINT= API endpoint for frontend {example: http://frontend-url:frontend-port}
```

#### 7. Start the app:
This project was bootstrapped with Create React App. In the project directory, you can run:

- `yarn dev` :
Runs the app in the development mode. The nodemon enables server to reload when you make changes.\
You also Logger/Winston logs in the console.\

- `yarn start` :
Simply launches the node server. Server mayno reload when changes are saved and hence should be used for deployment purpose only.

#### 8. Install and Run Postman :
Download and run [Postman], to try routes pick one from "routes folder" or here are few api requests to test:

![output-10](https://github.com/MickyG03/Whatsapp-Clone-Backend/assets/76037226/2a0460e3-6d7d-4f14-b9e8-f4fee4bfe3f5)


```
1. Register
Post http://localhost:8000/api/v1/auth/register
Body: {
    "email":"",
    "picture":"",
    "status":"",
    "password":""
}

2. Login
Post http://localhost:8000/api/v1/auth/login
Body: {
    "email":"",
    "password":""
}

3. Find Users
Get http://localhost:8000/api/v1/user?search={username}
Authorization -> Token : {use token from login}

4. Get Message
Get http://localhost:8000/api/v1/message/{conversation ID} 
Authorization -> Token : {use token from login}

5. Send Message
Post http://localhost:8000/api/v1/message
Authorization -> Token: {use token from login}
Body: {
    "convo_id":"",
    "message":""
}

and more in JS files of "Routes" directory.
```

#### 9. Setup and Run the Whatsapp Web Frontend:
See the "Getting started" section of [Whatsapp-Frontend] and get it up and running. Login to try the app.

## Tech
For this project I have used following libraries:

- [Node JS] - A JavaScript runtime built on Chrome's JavaScript engine. It allows you to run JavaScript code on the server side. 
- [Yarn] - A fast, reliable, and secure dependency management tool. It's used for managing project dependencies, ensuring consistency across different environments, and improving performance during the installation process.
- [React JS] -  A JavaScript library for building user interfaces.
- [Socket IO] - A JavaScript library for real-time web applications. It enables bidirectional communication between web clients and servers, allowing for real-time updates and messaging in applications.
- [NodeMon] - A utility that monitors for changes in files and automatically restarts the Node.js application.
- [Mongoose] - An elegant MongoDB object modeling tool designed to work in an asynchronous environment.
- [JavaScript] - A programming language that enables dynamic content and interactivity on web pages.
- [Express] - A fast, unopinionated, minimalist web framework for Node.js, designed for building web applications and APIs.
- [Winston] - A versatile logging library for Node.js, providing a simple and powerful way to log information in various formats.
- [JSON Webtoken] - A compact, URL-safe means of representing claims to be transferred between two parties. Used for secure authentication and authorization.
- [Bcrypt] - A library for hashing passwords and verifying password hashes. Commonly used for securing user authentication in web applications.
- [Postman] - A popular collaboration platform for API development that simplifies the process of testing, documenting, and sharing APIs. It provides a user-friendly interface for sending HTTP requests, inspecting responses, and automating API testing workflows.

## Development

Want to contribute? Great!
Contributions are welcome! If you have ideas for new features, improvements, or bug fixes, feel free to open an issue or submit a pull request.

## References

1. https://web.whatsapp.com/
2. https://www.geeksforgeeks.org/mern-stack/
3. https://www.udemy.com/course/whatsapp-clone-video-calls-mern-stack-socket-io/
4. https://www.npmjs.com/
5. https://socket.io/docs/v4/
6. https://www.youtube.com/watch?v=djMy4QsPWiI
7. https://github.com/feross/simple-peer?tab=readme-ov-file#usage
8. https://react-redux.js.org/using-react-redux/connect-mapdispatch
9. https://legacy.reactjs.org/docs/hooks-effect.html
10. https://mongoosejs.com/docs/guide.html
11. https://expressjs.com/en/4x/api.html
12. https://github.com/winstonjs/winston?tab=readme-ov-file#logging
---

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Node JS]: <https://nodejs.org/en/download>
   [Whatsapp-Frontend]: <https://github.com/MickyG03/Whatsapp-Clone-Frontend>
   [Whatsapp-Backend]: <https://github.com/MickyG03/Whatsapp-Clone-Backend>
   [MongoDB-Atlas]: <https://www.mongodb.com/cloud/atlas/register>
   [MongoDB-Compass]: <https://www.mongodb.com/products/tools/compass>
   [Javascript]: <https://www.javascript.com/>
   [Postman]: <https://www.postman.com/>
   [React JS]: <https://react.dev/>
   [Yarn]: <https://classic.yarnpkg.com/en/>
   [Socket IO]: <https://socket.io>
   [Simple Peer]: <https://github.com/feross/simple-peer>
   [NodeMon]: <https://nodemon.io/> 
   [Mongoose]: <https://mongoosejs.com/> 
   [Express]: <https://expressjs.com/>
   [Winston]: <https://github.com/winstonjs/winston> 
   [JSON Webtoken]: <https://jwt.io/> 
   [Bcrypt]: <https://www.npmjs.com/package/bcrypt> 
