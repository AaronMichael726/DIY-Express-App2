/**
 * DELIVERABLE: DIY Express app. 
 * Worked along with Traversy Media YouTube page, but updated packages to include sequelize
 * https://www.youtube.com/watch?v=bOHysWYMZM0
 */

// imports
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')

// database
const db = require('./config/database')

db.authenticate()
.then(() => console.log('Database connected...'))
.catch( err => console.log('Error: ' + err))
const app = express()

// routes 
app.get('/', (req, res) => res.send('INDEX'))

// gig routes
app.use('/gigs', require('./routes/gigs'))

//port
const PORT = process.env.PORT || 8000
app.listen(PORT, console.log(`Server started on PORT: ${PORT}`))