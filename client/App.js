import React from 'react'
import axios from 'axios'
import Graphs from './Graphs'
import Header from './Header'
import UserInfo from './UserInfo'
import UserTweet from './UserTweet'
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
                    <Header />
                    <a href="/login/twitter">Log In!</a>
                </div>
            )
        } else {
            return (
                <div>
                    <Header />
                    <UserInfo user={this.state.user} />
                    <UserTweet tweetFacts={this.state.tweetFacts} response={this.state.response} />
                    <Graphs data={this.state.response} />
                </div>
            )
        }
    }
}
