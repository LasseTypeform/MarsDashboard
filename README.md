# Functional Programming with Javascript 

## Student's (Lasse Mollerup) Instructions

<!-- Clone Project -->
To start this project use the following code in your terminal

git clone https://github.com/LasseTypeform/MarsDashboard.git

<!-- Get NASA API Key -->
Afterwards make sure you have an API key NASA’s API.

If you don't have one, go to https://api.nasa.gov/ and create your own. 

Once you have your own API key you can add it instead of apiKeyValue in the .env file of the project.

<!-- Use NPN or YARN to run the project -->
Make sure NPM or YARN is installed, or add it with the followign:
YARN https://classic.yarnpkg.com/en/docs/install
NPM https://docs.npmjs.com/about-npm-versions


Once installed, run go to the project from the terminal and run npm start or yarn start. 

Open your browser and paste in http://localhost:3000/ 

<!-- Instructions of the page once open in the browser -->
You will then be able to choose between 3 different rovers. Click on one of them to see the latest images. 
<!-- My add on for this project -->
This project only required to see the latest photos of each rover. 
However, when I started the project the latest photos from rover Spirit and Opportunity only includes 1 and 2 images, 
I have therefore chosen to add an extra call URL in the server (index.js) for a fixed date where 
they both have more images to show. Since the two calls required different URLs and because the response
from both calls are different. I have created a function checkData, that checks if the response 
has a key of 'latest_photos'. If so I assign this data to the 'photos' key, in order to render the image array.

## My general approach to the project
I have tried to write my code DRY, clean and easy to read, by adding comments all along the project. 

To make my code predictable, I am using pure functions coupled with a global state contained in Immutable.js. 
I have chosen this approach to guarantee a code in which there won't be any mutations (except dom manipulation in this case). For the same input, the result you will get is always the same.

Along with my many comments in the code, the functional approach makes debugging much easier, as it is easier to know which function has which responsibility. And when a bug occurs, you are confident where to look at. 


### Big Picture provided on the project from Udacity

You are going to create a Mars rover dashboard that consumes the NASA API. Your dashboard will allow the user to select which rover's information they want to view. Once they have selected a rover, they will be able to see the most recent images taken by that rover, as well as important information about the rover and its mission. Your app will make use of all the functional concepts and practices you have learned in this course, and the goal is that you would become very comfortable using pure functions and iterating over, reshaping, and accessing information from complex API responses. 

### Project Requirements

To complete this project, your UI must show the following:

- [ ] A gallery of the most recent images sent from each mars rover
- [ ] The launch date, landing date, name and status along with any other information about the rover
- [ ] A selection bar for the user to choose which rover's information they want to see

To complete this project, your UI must do the following:

- [ ] Be responsive. Needs to look good(aka not broken) on phones(max width 768px) and desktop(min-width 991px, max-width 1824px). Tablet view is optional.
- [ ] Provide a way to dynamically switch the UI to view one of the three rovers 
**This can be done using tabs, buttons, or any other UI control

To complete this project, your frontend code must:

- [ ] Use only pure functions
- [ ] Use at least one Higher Order Function
- [ ] Use the array method `map`
- [ ] Use the ImmutableJS library

To complete this project, your backend code must:

- [ ] Be built with Node/Express
- [ ] Make successful calls to the NASA API
- [ ] Use pure functions to do any logic necessary
- [ ] Hide any sensetive information from public view (In other words, use your dotenv file)

### Above and Beyond

The NASA API has a lot more data to offer than what we are using here. There's no extra credit in this course, but it could be fun explore their API and see what they have to offer and what strikes your creativity to add into your project. You are not limited to the API calls we require. Look here (https://api.nasa.gov/ at the Browse API's section) to see all that's available.

Some ideas might be to incorporate the Astronomy Photo of the Day into your design, collect weather information on Mars, etc...

### Design

Create an image gallery slider, put a full page background image, code some falling asteroids with css animations ... the visual design of this UI is up to you! There is a lot of awesome dashboard design inspiration out there. You have already been given a good start with a mobile-first stylesheet already set up for you. 



