const express = require('express')
const router = express.Router()
const passport = require('passport')
const Twitter = require('twitter')
const TwitterStrategy = require('passport-twitter').Strategy
const OAuth = require('OAuth')
const PersonalityInsightV3 = require('watson-developer-cloud/personality-insights/v3')
const secrets = require('./secrets.js')

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

passport.use(strategy)

router.get('/twitter', passport.authenticate('twitter', {authInfo: true}))

router.get('/twitter/return', 
  passport.authenticate('twitter', { failureRedirect: '/' }),
  (req, res) => {
    req.session.authInfo = req.authInfo
    res.redirect('/')
})

router.get('/me', (req, res, next) => {
  console.log(req.session)
  res.send(req.session)
})

router.get('/data', (req, res, next) =>  {
  let client,
      params,
      personality_params
  console.log('SESSION', req.session)
    if(req.session.passport) {
        client = new Twitter({
          consumer_key: process.env.TWITTER_CONSUMER_KEY,
          consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
          access_token_key: req.session.authInfo.access_token_key,
          access_token_secret: req.session.authInfo.access_token_secret
        })
      

      let tweetContent = []
    
      async function tweetPromise() {
        let i = 1
        let lastLength = 200
        let tweetFacts = {
          tweetList: []
        }
        while(tweetContent.length <= 3000 && lastLength >= 199) {
          let count = 0
          params = {
            screen_name: "UtilityLimb", //Test user with less than 3k tweets
            count: 201,
            include_rts: 1,
            tweet_mode: 'extended',
            trim_user: true,
            page: i
          }
    
          let tweets = await client.get('statuses/user_timeline', params)
          tweets.forEach(tweet => {
            tweetContent.push({
              content: tweet.full_text,
              contenttype: 'text/plain',
              language: 'en'
            })
            tweetFacts.tweetList.push({
              content: tweet.full_text,
              date: tweet.created_at
            })
          })
          lastLength = tweets.length
          i++
        }

        tweetFacts.totalTweets = tweetContent.length,
        tweetFacts.firstTweet = tweetContent[0].content,
        tweetFacts.lastTweet = tweetContent[tweetContent.length-1].content
        return {tweetContent, tweetFacts}
      }
    
      tweetPromise()
      .then(resTweets => {
          let analysis
          personality_insights.profile({contentItems: resTweets.tweetContent}, (err, response) => {
          if (err) console.error(err)
          res.send({response, tweetFacts: resTweets.tweetFacts, user: req.session.passport.user})
        })
      })
      .catch(console.error)
    } else {
      res.send({response: {}, tweetFacts: {}, user: {}})
    }
})

module.exports = router