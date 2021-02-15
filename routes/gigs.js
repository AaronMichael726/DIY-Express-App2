// imports
const express = require('express')
const router = express.Router()
const db = require('../config/database')
const Gig = require('../models/gigs')

// get gig list
router.get('/', (req, res) => 
    Gig.findAll()
    .then(gigs => {
        res.render('gigs', {
            gigs //part of es6 or whatever the new js is called.
        })
    })
    .catch(err => console.log(err))
    );

// display add gig form
router.get('/add', (req, res) => res.render('add'))

// Add a gig -- will change, but going to start with a get req, never add data via get req.
router.post('/add', (req, res) => {
    const data = {
        title: 'simple wordpress website', 
        technologies: 'wordpress,php,html,css', 
        budget: '$1000',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed volutpat nisi vel viverra suscipit. Suspendisse eleifend magna nulla. ',
        contact_email: 'user2@gmail.com'
    }

    // destructure to pull out the variables
    let { title, technologies, budget, description, contact_email } = data

    // insert into table
    Gig.create({
        title, // because of es 6 we can do this because the object that variable is the same
        technologies,
        description,
        budget,
        contact_email
    })  // returns a promise so then-catch -- ask what does return a promise mean?
    .then(gig => res.redirect('/gigs'))
    .catch(err => console.log(err))
})
module.exports = router