## Book Trading App

An app for trading books.

## Table of contents

  * [Book Trading App](#book-trading-app)
  * [Table of contents](#table-of-contents)
  * [Prerequisites](#prerequisites)
  * [Starting the App](#starting-the-app)
  * [Salient Features](#salient-features)
    * [Book Gallery](#1-book-gallery)
    * [Add/Delete a book](#2-adddelete-a-book)
    * [Opening Trade Requests](#3-opening-trade-requests)
      * [No Exchange Requests](#no-exchange-requests)
      * [With Exchange Requests](#with-exchange-requests)
      * [Create Request by Selecting Other's Book](#create-request-by-selecting-others-book)
      * [Create Request by Selecting One's own Book](#create-request-by-selecting-ones-own-book)
    * [Managing Trade Requests](#4-managing-trade-requests)
      * [Trade Request Opened by User](#trade-request-opened-by-user)
      * [Trade Request Opened for User](#trade-request-opened-for-user)
    * [Intelligent Trade Request Management](#5-intelligent-trade-request-management)
  * [Built With](#built-with)
  * [Contributing](#contributing)
  * [Author](#author)
  * [License](#license)
  * [Acknowledgments](#acknowledgments)
  * [TODOs](#todos-)

## Prerequisites
Make sure you have the following installed.
 * Node (version, >= 7)
 * MongoDB (version, >= 3)

## Starting the App
Follow below steps to start the app locally for the first time.

 * clone this repo
 * cd into the `BookTradingApp` directory
 * Run - `npm i` to install depencies
 * Run - `cp sample.env .env`
 * Fill the **.env** file with appropriate values
 * Run - `mkdir data` to create a **db** directory
 * Run - `mongod --dbpath ./data > /dev/null &` to start mongo server
 * Run - `npm fill` to fill the database with seed values
 * Run - `npm start` to start the server

 [Note]:- You need to follow the above steps first time only. From next time onwards start the server by running `npm start`.

## Salient Features
This app helps send/receive/manage trade requests for books.

 ### 1. Book Gallery

 ![Books](readme-resources/booklist.png)

 User can view all the books available, i.e. books owned by **all** the users can be viewed.

 ### 2. Add/Delete a book

 ![Add Books](readme-resources/add-books.gif)

 User can add a book to the app. Adding a book in the app means that the user is indicating they possess the book.

 The app has a built in search system, which helps a user search for a book and add it.

 The search API uses the [Google Books API](https://developers.google.com/books) on the backend, which ensures the correct ISBN number is retreived which helps identify a book accurately.

 User can read the summary of the book before deciding whether that book is the one they wish to add.

 User can add mutiple books at the same time.

 User can have multiple copies of the same book.

 ### 3. Opening Trade Requests

 ![Trade Requests](readme-resources/trade-requests.png)

 This is the core feature of this app, i.e, users can exchange books.

 When a user opens a trade request for a book, the user may decide to give or not give any book in exchange.

  #### No Exchange Requests

  If a user decides `not` to give a book in exchange, the real life parallel is like asking for a book from someone.

  #### With Exchange Requests

  If a user asks for a book and wants to give their book in return then this is like actually exchanging a book in real life scenario.

  *Both the above options are possible using this app.*

  There are basically two ways to open `trade requests`.

  #### Create Request by Selecting Other's Book

  User can select someone else's book while viewing the book list in the gallery.

  This opens a window showing details of the book (*summary*, *added by*, etc). This window also contains a `trade` action button. When the `trade` button is clicked, a dropdown emerges asking to confirm the trade request. In addition to that there is **optional** section where user can add a book they would like to give in exchange.

  [Note]:- The exchange book section is **optional** here.

  If request is made without using it, then this is **Category #1** [no exchange request](#no-exchange-requests)

  If a user selects their own book from the optional section, then this is **Category #2** [with exchange request](#with-exchange-requests)

  #### Create Request by Selecting One's own Book

  User can select their own book in `My Books` section.

  This opens a window which again has the `trade` button.
  When it is selected again a dropdown is shown asking to confirm the request.

  But this time there is **mandatory** section showing books belonging to all other people and asking to select.

  This should be obvious because making a `Trade Request` just by selecting one's own book makes no sense.

  User must select someone else's book and submit request.

  This will be the **Category #2** [with exchange request](#with-exchange-requests)

 ### 4. Managing Trade Requests

 As should be obvious by now there are two kinds of `Trade Request`.

  #### Trade Request Opened by User

  User can open `Trade Requests By Me` section to see a list of requests opened by them.

  They can see the book they asked for and the book they wanted to give in exchange (if they **did** want to give a book in exhange, remember this is **optional**).

  The only action a user can perform in this situation is `close` the `Trade Request`.

  #### Trade Request Opened for User

  User can open `Trade Requests For Me` section to see a list of requests opened by **other** users asking for books they own.

  They can see the book the other user asked for and the book the other user wanted to give in exchange (if at all, this is **optional**).

  User can perform two options here

   *   **Reject Trade Request** - If user selects reject, the `requester` (the one who opened the request) is informed.
   *   **Accept Trade Request** - If this is selected, books are exchanged. Other additional actions also take place.
       See [below](#feature-5---intelligent-trade-requests-management).

 ### 5. Intelligent Trade Request Management

 ![Trade Requests](readme-resources/trade.gif)

 If a user accepts a `Trade Request` for a particular book. It makes sense that he is implicitly rejecting other `Trade Requests` for the same book.

 Hence these are the steps which the system performs when a user accepts a `Trade Request`.

  * All pending requests by other users asking for the same book is automatically `rejected`. (If you have accepted the trade request of one person for a book, it automatically means you have rejected other requests for the same book.)

  * All pending requests by the user in which this particular book was supposed to be given away as exchange book are `closed`. (If you have accepted the trade request of one person for a book, it means you will no longer possess the book. And so you cannot tell anyone that you want to give this book in exchange.)

## Built With

- [Node](https://nodejs.org) - JS Runtime Environment
- [Npm](https://www.npmjs.com) - Package Manager
- [Express](https://expressjs.com/en/starter/installing.html) - Web Framework
- [MongoDB](https://www.mongodb.com) - Database
- [Mongoose](http://mongoosejs.com) - Database ORM
- [Vue](https://vuejs.org) - Frontend Library
- [Vuex](https://vuex.vuejs.org/en) - State Management Tool
- [Webpack](https://webpack.js.org) - Frontend Bundler
- [Mocha](https://mochajs.org) - Testing Framework
- [Git](https://git-scm.com) - Version Control
- [VS Code](https://code.visualstudio.com) - Code Editor
- [Heroku](www.Heroku,com) - Hosting and Continuous Deployment
- [Chrome](https://www.google.com/chrome/browser/desktop/index.html) - Browser

## Contributing

Contributions are welcome.
Please keep an eye on the Project's issue tracker and if you think you can handle an issue, please comment on the issue page.

## Author

* [Yasser Hussain](https://github.com/yasserhussain1110)

## License

[MIT](LICENSE.md)

## Acknowledgments

* ChinguCentral Community
* Family and Friends

## TODOs:-

* Improve UI, particularly trade modal dropdown.
* Add linting to webpack
