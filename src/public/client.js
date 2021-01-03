
// Global State of the page
let store = Immutable.Map({
    roverChosen: '',
    data: {},
    imageDate: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit']
})

// Adding markup to the page
const root = document.getElementById('root')

// Rendering the content in the root of the HTML, with the data of the Global State
const render = async (root, state) => {
    root.innerHTML = App(state)
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// Content included in the App that will be rendered
const App = (state) => {    
    console.log('state', state);

    const rovers  = Object.assign(state)
   
    // Checking to  see if data has been passed to the state
    // && roversrovers._root.entries[1][1] !== []
    if(rovers._root.entries[0][1] !== "" && Object.keys(rovers._root.entries[1][1]).length !== 0) {
    
    // If state has been updated with data from the API, then render the following.

        // If the roverChosen is not curiosity and imageDate is still '' 
        
        if(rovers._root.entries[0][1] !== 'Curiosity' && rovers._root.entries[2][1] === '') {
            return (`
            <header>
                ${headerSection()}
            </header>
        
            <section class="roverInfoSection"> 
            ${renderRoverInfo(rovers)}
            </section>
            <section class="imagesSection">
            ${renderImages(rovers)}
            <Button id="seeMoreImagesBtn" onClick="seeMoreImages(store)">See more images from this Rover</button>
            </section>
    
            <footer>
                <p>Created by Lasse Mollerup * Rover image-credit to NASA * Button image-background credit to Vitaliy Zamedyanskiy, Yue-Liu and Nicolas Lobos</p>
            </footer>
            `)
        } 
        // Otherwise return the following view for all the rovers
        else     
            return (`
            <header>
                ${headerSection()}
            </header>
        
            <section class="roverInfoSection"> 
            ${renderRoverInfo(rovers)}
            </section>
            <section class="imagesSection">
            ${renderImages(rovers)}
            </section>
            <footer>
                <p>Created by Lasse Mollerup * Rover image-credit to NASA * Button image-background credit to Vitaliy Zamedyanskiy, Yue-Liu and Nicolas Lobos</p>
            </footer>
            `)
    } 
    // If no data has been added to the Global state then only render the Header with the rover buttons and the the footer.
    else 
        return (`
        <header>
        ${headerSection()}
        </header>
       
        <footer>
            <p>Created by Lasse Mollerup * Rover image-credit to NASA * Button image-background credit to Vitaliy Zamedyanskiy, Yue-Liu and Nicolas Lobos</p>
        </footer>
    `)
}

// ------------------------------------------------------  COMPONENTS

// Componenent to update the Global state
const updateStore = (property, value) => {
    store = store.set(property, value)
    render(root, store)
}

// Conponent reffering to onClick call on the Rover buttons
function pickRover(name){

    const roverChosenfromPicker = name 
 
    // Updating the Global State with the name of the rover chosen
    updateStore('roverChosen', roverChosenfromPicker)
    updateStore('imageDate', '')
 
    // Initiating the API-call-function to get information from the server using the updated state
    return getInformationAboutRover(store);

}

// Conponent reffering to onClick call on the seeMoreImagesBtn button
function seeMoreImages(state){

    const datePicked = (state.roverChosen === 'Spirit') ? '2010-01-21' : '2018-02-11'
    
    // Updating the Global State with the name of the rover chosen
    updateStore('imageDate', datePicked)
    
    // Initiating the API-call-function to get information from the server using the updated state
    return getInformationAboutRover(store); 

}

// The HTML that will be rendered in the headerSection
const headerSection = () =>{

    return (`    
        <h1>Choose a Rover</h1>
            <div id='roverDiv'>
                <ul>
                    <button id="curiosity" onClick="pickRover('Curiosity')">Curiosity</button>
                    <button id="opportunity" onClick="pickRover('Opportunity')">Opportunity</button>
                    <button id="spirit" onClick="pickRover('Spirit')">Spirit</button>
                </ul>
            </div>
    `)
}

// The HTML that will be rendered in the roverInfoSection with data from the state 
const renderRoverInfo = (props) =>{
   
    const rovers = Object.assign(props)

    return (`
        <div class="roverDetails">
            <h2>Rover Name: ${rovers._root.entries[0][1]}</h2>
            <h3>Launch Date: ${rovers._root.entries[1][1][0]['rover']['launch_date']}</h3>
            <h3>Landing Date: ${rovers._root.entries[1][1][0]['rover']['landing_date']}</h3>
            <h3><strong>Date corresponding to date on Earth:</strong> ${rovers._root.entries[1][1][0].earth_date}</h3> 
        </div>
        `) 
}



// The HTML that will be rendered in the imagesSection with images and image data from the state 
const renderImages = (props) =>{

    const images = props._root.entries[1][1].map(ele => ele)

    const imagesArr = images.map((ele) => 
    `<div class="imageBox">
        <img class="image" src="${ele.img_src}" alt="Photo taken by ${props._root.entries[0][1]} on Mars on ${ele.earth_date}"/>
        <p class="imageData">Camera: ${ele['camera']['full_name']}</p><p class="imageData">Picture taken on ${ele.earth_date}</p> <p class="imageData">Sol: ${ele.sol}</p></div>`
    ).join(' ')

    return imagesArr
}

// ------------------------------------------------------  API CALL functions 

// async function to call from the client to the server (index.js)
async function apiCaller(state){

    // checking which rover has been chosen
    const nameParam = state._root.entries[0][1]

    // calling the server (index.js) with the chosen rover and imageDates value as params.
    const res = await fetch(`http://localhost:3000/rovers?name=${nameParam}&date=${state._root.entries[2][1]}`)

    const data = await res.json()

    // Once the reponse has been received from the server (index.js) run the following function 
    // to make sure the state.data.photos is not []
    let temp = Object.assign(checkData(data))
    
    return temp
}


// Since the latest photos of rover Spirit and Opportunity only includes 1 and 2 images, 
// I have chosen to add an extra call URL in the server (index.js) for a fixed date where 
// they both have more images to show. Since the two calls required different URLs and because the response
// from both calls are different. I have created a function checkData, that checks if the response 
// has a key of 'latest_photos'. If so I assign this data to the 'photos' key, in order to render the image array.

function checkData(data){

    const dataToCheck = Object.assign(data)

    // Since the data 
    if(Object.keys(dataToCheck.data) == 'latest_photos') {
        
        Object.defineProperty(data.data, 'photos', Object.getOwnPropertyDescriptor(data.data, "latest_photos"));
        delete Object.keys(data.data);
        return dataToCheck
    } 
    else return dataToCheck

}

// Function to initiate the call to the server (index.js) and assign the response data to the Global state.
async function getInformationAboutRover(state){

   const dataFrom_apiCaller = await Object.assign(apiCaller(state))

   updateStore('data', dataFrom_apiCaller.data.photos)     
}
