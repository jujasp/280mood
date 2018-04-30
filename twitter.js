const express = require('express')
const router = express.Router()
const passport = require('passport')
const Twitter = require('twitter')
const Strategy = require('passport-twitter').Strategy
const OAuth = require('OAuth')
const PersonalityInsightV3 = require('watson-developer-cloud/personality-insights/v3')
const secrets = require('./secrets')


const strategy = new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL
}, (token, tokenSecret, profile, done) => {
    return done(null, profile, {access_token_key: token, access_token_secret: tokenSecret})
})

const personality_insights = new PersonalityInsightV3({
    username: process.env.WATSON_INSIGHTSV3_USERNAME,
    password: process.env.WATSON_INSIGHTSV3_PASSWORD,
    version_date: '2017-10-13',
    headers: {'X-Watson-Learning-Opt-Out': 'true'}
  })

router.get('/twitter/login', 
('twitter', {authInfo: true}));

router.get('/login/twitter/return', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    req.session.authInfo = req.authInfo
    res.redirect('/')
})
