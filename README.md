Chatter
====================
Chat application built with Ionic, AngularJS, and Auth0

Setup
------------

1. Open app.js
-----------

- Replace domain with your auth0 comain
- replace clientID with your clientID 

>authProvider.init({  
>    domain: 'naderdabit.auth0.com',  
>    clientID: 'FtsX9Xg0IiryBfb001YzcT3J8f4u6jNx',  
>});


2. Open controllers.js
-----------
- Replace Firebase reference with your firebase url

> var ref = new Firebase("https://jacksondevsfirebase.firebaseio.com/messages");

3. From root of directory, type "bower install"
