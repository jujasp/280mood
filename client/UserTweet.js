import React from 'react'

const UserTweet = props => {
    const {tweetFacts, response} = props
    return (
        <div className="section tweets">
            <p>Total tweets: {tweetFacts.totalTweets}</p>
            <p>Word Count:{response.word_count}</p>
            <p>First tweet:<br /> {tweetFacts.firstTweet}</p>
            <p>Last tweet:<br /> {tweetFacts.lastTweet}</p>
        </div>
    )
}

export default UserTweet
