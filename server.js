const express = require('express')
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy
const OAuth = require('OAuth')
const Twitter = require('Twitter')
const secrets = require('./secrets.js')

const strategy = new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerLey: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL
})

passport.use(strategy, (token, tokenSecret, profile, done) => {
    return done(null, profile)
})

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((obj, done) => {
    done(null, obj);
})

const app = express()

app.use(require('morgan')('dev'))
app.use(require('cookie-parser')())
app.use(require('body-parser')())
app.use(require('express-session')({secret: 'blossombellascskye', resave: true, saveUninitialized: true}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})