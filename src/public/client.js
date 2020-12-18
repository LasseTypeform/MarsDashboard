
let store = {
    roverChosen: '',
    data: '',
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit'])
}


// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

// create content
const App = (state) => {    
    let rovers  = state
    console.log('rovers', state)
    if(rovers.data !== '' && rovers.data.data.photos !== []) {
    
   

    return (`
        <header>
            ${headerSection()}
        </header>
        <main>
        ${renderRoverInfo(rovers)}
        ${renderImages(rovers)}
        </main>
        <footer></footer>
    `)
    } else return (`
        <header>
        ${headerSection()}
        <main>
            <section>
            <div class="roverDetails">
                <h3> No Data collected </h3>
            </section>
        </main>
        <footer>
        </footer>
    `)
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

function pickRover(string){

    let roverChosen = string 
    let pickedRover = { roverChosen }
    updateStore(store, pickedRover)

    return getInformationAboutRover(store);

}


const headerSection = () =>{

    return (`    
        <h1>Choose a Rover</h1>
            <div id='roverDiv'>
                <ul>
                    <button id="curiosity" onClick="pickRover('Curiosity')",href=#>Curiosity</button>
                    <button id="opportunity" onClick="pickRover('Opportunity')",href=#>Opportunity</button>
                    <button id="spirit" onClick="pickRover('Spirit')",href=#>Spirit</button>
                </ul>
            </div>
    `)
}

function renderRoverInfo(props){

    let rovers = Object.assign(props)
        return (`
        <section class="roverInfoSection">
        <h2>Rover Name: ${rovers.roverChosen}</h2>
        <h3>Launch Date: ${rovers.data.data.photos[0].rover.launch_date}</h3>
        <h3>Landing Date: ${rovers.data.data.photos[0].rover.landing_date}</h3>
        <h3><strong>date corresponding to date on Earth:</strong> ${rovers.data.data.photos[0].earth_date}</h3> </div>
        </section>
        `
    )
}


function renderImages(props){

    let images = props.data.data.photos.map(ele => ele)

    const imagesArr = images.map((ele) => {
        return (`
        <section class="imagesSection">
        <div class="imageBox">
        <img src="${ele.img_src}" alt='Photo taken by ${props.roverChosen} on Mars on ${props.data.data.photos[0].earth_date}'/> 
        <p class="imageData">Camera: ${ele.full_name}</p> 
        <p class="imageData">Picture taken on ${ele.earth_date}</p> 
        <p class="Sol">${ele.sol}</p> 
        </div>
        </section>
        `)
    });
    
    return (`<div>${imagesArr}</div>`)
}



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

async function getInformationAboutRover(state){

    const nameParam = state.roverChosen.toLowerCase()

    const res = await fetch(`http://localhost:3000/rovers/${nameParam}`)

    const data = await res.json()
    console.log('data in call', data);
    let temp = { data }

   updateStore(store, temp)     
}

// console.log('store after call', store);



