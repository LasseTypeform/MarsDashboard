//<reference path='./node_modules/immutable/dist/immutable.d.ts'/>
// import { Immutable } from '../../node_modules/immutable/dist/immutable';


// const { List } = require('../../node_modules/immutable/dist/immutable');

// const List  = require('immutable')

let store = {

    data:{
    rover_name: "Curiosity",
    rover_status: "active",
    rover_id: 5,
    landing_date: "2012-08-06",
    launch_date: "2011-11-26",
    camera_full_name: "Front Hazard Avoidance Camera",
    camera_id: 20,
    camera_name: "FHAZ",
    earth_date: "2020-12-12",
    id: 782753,
    img_src: "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02969/opgs/edr/fcam/FLB_661081489EDR_F0841360FHAZ00337M_.JPG"
    }
    ,
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit'])
}


// add our markup to the page
const root = document.getElementById('root')

const updateStore = (newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (state) => {

    let rovers  = state

    console.log('rovers', rovers)



    return `
        <header>
        <h1>Choose a Rover</h1>
            <div id='roverDiv'>
                <h2>Curiosity</h2>
                <h2>Opportunity</h2>
                <h2>Spirit</h2>
            </div>
        </header>
        <main>
            <section>
                <h3><strong>rover name:</strong> ${rovers.rover_name}</h3>
                <h2><strong>rover id:</strong> ${rovers.rover_id}</h2>
                <p><strong>rover status:</strong> ${rovers.rover_status}</P>
                <p><strong>landing date:</strong> ${rovers.landing_date}</P>
                <p><strong>launch date:</strong> ${rovers.launch_date}</P>
                <p><strong>camera full_name:</strong> ${rovers.camera_full_name}</P>
                <p><strong>camera id:</strong> ${rovers.camera_id}</P>
                <p><strong>camera name:</strong> ${rovers.camera_name}</P>
                <p><strong>earth date:</strong> ${rovers.earth_date}</P>       
            </section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS



// Example of a pure function that renders infomation requested from the backend
// const ImageOfTheDay = (apod) => {

   
    // If image does not already exist, or it is not from today -- request it again
    // const today = new Date()
    // const photodate = new Date(apod.date)
    // console.log(photodate.getDate(), today.getDate());

    // console.log(photodate.getDate() === today.getDate());
    // if (!apod || apod.image.date === today.getDate() ) {
    //     getImageOfTheDay(store)
    // }
   
    // check if the photo of the day is actually type video!
    // if (apod.image.media_type === "video") {
    //     return (`
    //         <p>See today's featured video <a href="${apod.image.url}">here</a></p>
    //         <p>${apod.image.title}</p>
    //         <p>${apod.image.explanation}</p>
    //     `)
    // } else {
    //     return (`
    //         <img src="${apod.image.url}" height="350px" width="100%" />
    //         <p>${apod.image.explanation}</p>
    //     `)
    // }
//     getImageOfTheDay(store)
    
// }

// ------------------------------------------------------  API CALLS

// Example API call
// const getImageOfTheDay = (state) => {
//     let { apod } = state

//     fetch(`http://localhost:3000/apod`)
//         .then(res => res.json())
//         .then(apod => updateStore(store, { apod }))
        
//     // return data
// }

// const temp = {};

const getInformationAboutRover = () => {
        fetch(`http://localhost:3000/rovers`)
        .then(res => console.log(res.json()))
        // .then(apod => updateStore(store, { apod }))     
       
        
}
getInformationAboutRover()
console.log(store)
