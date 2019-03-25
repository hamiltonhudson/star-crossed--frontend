# Star-Crossed Frontend README

## Project Overview

Star-Crossed is a zodiac dating app that matches users based on compatibility of their sun sign and gender preference. A user is required to include their DOB (to find their sun sign on the backend), as well as gender and gender preference for filtering results. Two algorithms on the backend to facilitate matches — one finds a sun sign’s compatible signs based on API data. The other creates matches with that compatibility, then cross-references against both matched users gender and gender preference. In their profile, a user can view all matches, click to view a match’s profile, and decline or accept a match. Declining will nix the match for both users obviously, but accepting will generate a status of either “pending” or “accepted”, contingent on whether or not the matched user has also accepted. If a user edits their details (gender preference, for example) matches will be regenerated, but declined matches will never be re-created or re-added. A user can of course view all of their accepted matches and soon (working stages), be able chat with them as well. 🔮💌

## Technologies Used

React, Redux, Ruby on Rails, Zodiacal API, HTML, CSS, JSON, Materialize React CDN & GoogleFonts, WebSockets/ActionCable, ActiveModel Serializers & other Ruby gems

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites
To use, clone down this repo and open with your preferred text editor. Before anything else, if you haven’t already, make sure to set up the project backend as well (link below), which will ensure you have the working usable version of Ruby/Rails installed on your machine. This project uses React/Redux and requires node package manager, so once you have it open in your local environment, run the following: 

`npm install`

terminal command from the root of the project to install dependencies. 

### Installing
Once npm is finished installing and you’re back to a working terminal, jump over to the backend project root and run:

`rails s`

to start the server. (From the previous backend set up, should indicate successful connection to server, but to double check, navigate to http://localhost:3000 and make sure you have a “Yay! You’re on Rails!” welcome page). Back in the terminal, run:

`npm start`

and type “yes” or “y” when asked if you’d like to run this server on another port, which will launch Star-Crossed in your browser. You can sign up as a new user with all relevant user info, (and sign back in with email and password), edit your user details, and, of course, view, decline 👎🏼 and *accept* 😉, your matches. ✨

## Backend Link

[star-crossed--backend](https://github.com/ehamiltonhudson/star-crossed--backend)

## Demo Video

[star-crossed.mov](https://drive.google.com/file/d/1s-mXsQ8bZujMtY53DviUvsxRgVIZOdFU/view)

## Authors

**Hamilton Hudson**

≫ ehamiltonhudson@gmail.com<br/>
↳ *LinkedIn*: https://www.linkedin.com/in/hamiltonhudson<br/>
↳ *Website*: https://hamiltonhudson.myportfolio.com<br/>
↳ *Blog*: https://ehhudson.wordpress.com<br/>
↳ *Twitter*: https://twitter.com/HamiltonHudson

## License

This project is licensed under the MIT License - see the [LICENSE.md](/LICENSE) file for details.
