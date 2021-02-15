// imports
const express = require('express')
const router = express.Router()
const db = require('../config/database')
const Gig = require('../models/gigs')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// get gig list
router.get('/', (req, res) => 
    Gig.findAll()
    .then(gigs => res.render('gigs', {
            gigs //part of es6 or whatever the new js is called.
        }))
    .catch(err => console.log(err)))

// display add gig form
router.get('/add', (req, res) => res.render('add'))

// Add a gig -- will change, but going to start with a get req, never add data via get req.
router.post('/add', (req, res) => {
    // destructure to pull out the variables
    let { title, technologies, budget, description, contact_email } = req.body // added req.body to pull the data from the form
    // initialize errors array
    let errors = []

    // server side validations
    if (!title){
        errors.push({ text: 'Please add a title' })
    }
    if (!technologies){
        errors.push({ text: 'Please add some technologies' })
    }
    if (!description){
        errors.push({ text: 'Please add a description' })
    }
    if (!contact_email){
        errors.push({ text: 'Please add a contact email' })
    }

    // Check for errors
    if (errors.length > 0 ){
        // re-render the form
        res.render('add', {
            errors,
            title, 
            technologies, 
            budget,
            description,
            contact_email
        })
    } else {
        if(!budget) {
            budget = 'Unknown'
        } else {
            budget = `$${budget}`
        }

        // Make technologies lowercase and remove the sapce after the comma
        technologies = technologies.toLowerCase().replace(/, /g, ',')

        Gig.create({
            title, // because of es 6 we can do this because the object that variable is the same
            technologies,
            description,
            budget,
            contact_email
        })  // returns a promise so then-catch -- ask what does return a promise mean?
        .then(gig => res.redirect('/gigs'))
        .catch(err => console.log(err))
    }
})

// search for gigs
router.get('/search', (req, res) => {
    let { term } = req.query
    term = term.toLowerCase()

    Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' }}})
    .then(gigs => res.render('gigs', {gigs}))
    .catch(err => console.log(err))
})

module.exports = router