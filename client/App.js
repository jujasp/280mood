import React from 'react'
import axios from 'axios'
import { Link } from 'react-router'

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
        if(!this.state.checked) {
            return (
                <div> yikes</div>
            )
        } else if (!this.state.user.id) {
            return (
                <div>
                    <button><Link to="/login/twitter">Log In!</Link></button>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>BIG FEELS</h1>
                    <div>
                        <h2>{this.state.displayName}</h2>
                        <h3>{this.state.user.username}</h3>
                    </div>
                    <div>
                        <p>First tweet: </p> 
                        <p>Last tweet: </p>
                    </div>
                    <div>
                        <p>Number of tweets: </p>
                        <p>Number to words:</p>
                    </div>
                </div>
            )
        }
    }
}