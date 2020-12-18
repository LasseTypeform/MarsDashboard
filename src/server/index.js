require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls


// Get information about Rover
app.get('/rovers/:name', async (req, res) => {

    let nameParam = req.params.name.toLowerCase()

    const earthDate = (nameParam) => {
        if(nameParam === 'spirit') {
            return '2010-01-21'
        } else if(nameParam === 'opportunity') {
            return '2018-02-11'
        } else return '2020-10-16'
    }
    
    console.log('datechosen', earthDate(nameParam))

    try {
        // let data = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${nameParam}/photos?earth_date=2018-12-12&api_key=${process.env.API_KEY}`)
        let data = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${nameParam}/photos?earth_date=${earthDate(nameParam)}&api_key=${process.env.API_KEY}`)
          .then(res => res.json())
          res.send({ data })
     
    } catch (err) {
        console.log('error:', err);
    }

})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))



