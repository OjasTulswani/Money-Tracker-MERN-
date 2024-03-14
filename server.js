const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')

// config dot env file
dotenv.config();

// rest objects
const app = express();

// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

// routes
app.get('/', (req,res) =>{
    res.send(`<h1>Hii from server</h1>`)
    
})

// port
const PORT = 8080 || process.env.PORT

// listen server
app.listen(PORT, () =>{
    console.log(`Server riunning on port ${PORT}`);
})