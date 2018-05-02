import React from 'react'
import axios from 'axios'
import Graphs from './Graphs'
//TO DO ADD REACT-ROUTER TO RESOLVE 'FLICKERING' IN ASYNC
export default class App extends React.Component {
    constructor(){
    super()
    this.state = {
        user: {},
        response: {},
        tweetFacts: {},
        checked: false
        }
    }

    componentDidMount() {
        console.log(this.state)
        axios.get('/login/data')
        .then(res => res.data)
        .then(data => {
            data.checked = true
            this.setState(data)
        })
        .catch(console.error)
    }

    render() {
        if (!this.state.checked) {
            return <div />
        } else if (!this.state.user.id) {
            return (
                <div>
                    <a href="/login/twitter">Log In!</a>
                </div>
            )
        } else {
            return (
                <div>
                    <div id="content">
                        <div id="userInfo">
                            <img src={this.state.user.photos[0].value} />
                            <div>
                                <h2>{this.state.user.displayName}</h2>
                                <h3>{this.state.user.username}</h3>
                            </div>
                        </div>
                        <div id="userTweets">
                            <p>Total tweets: {this.state.tweetFacts.totalTweets}</p>
                            <p>Word Count:{this.state.response.word_count}</p>
                            <p>First tweet: {this.state.tweetFacts.firstTweet}</p>
                            <p>Last tweet: {this.state.tweetFacts.lastTweet}</p>
                        </div>
                        </div>
                        <div id="graphs">
                            <Graphs data={this.state.response} />
                        </div>
                    </div>
            )
        }
    }
}