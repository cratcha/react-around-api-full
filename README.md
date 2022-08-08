# Full Stack Project: Around The U.S.

**Around the U.S.** is full (MERN) stack web app that allows users to create an account, log in, add, delete, like, and unlike photos and update their avatar.

## Technologies: 
1. HTML 
2. CSS 
3. React.js
4. Express.js
5. REST APIs
6. MongoDB
7. JWT Authorization

![website screenshot](https://github.com/cratcha/react-around-api-full/blob/main/frontend/public/AroundUs_Screenshot.png?raw=true)

## REST API Endpoints
`POST`       `/signup`              Registers a user                       
`POST`       `/signin`              Login a user                           
`GET`        `/users`               Get JSON list of all the users         
`GET`        `/users/:userId`       Get a specific user profile with an ID 
`POST`       `/users`               Create a specific user profile         
`PATCH`      `/users/me`            Update the current user profile        
`PATCH`      `/users/me/avatar`     Update the current user avatar         
`GET`        `/cards`               Get JSON list of all the cards        
`POST`       `/cards`               Create a new card                      
`DELETE`     `/cards/:cardId`       Delete a card by the given ID          
`PUT`        `/cards/:cardId/likes` Update a card by liking it             
`DELETE`     `/cards/:cardId/likes` Delete a like on the card         



Link to the project [cratcha.students.nomoreparties.sbs](https://cratcha.students.nomoreparties.sbs).

Link to the website that hosts my API [api.cratcha.students.nomoreparties.sbs](https://api.cratcha.students.nomoreparties.sbs)
