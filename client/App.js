import React from 'react'
import axios from 'axios'
import Graphs from './Graphs'
import Header from './Header'
import UserInfo from './UserInfo'
import UserTweet from './UserTweet'
import Loader from './Loader'
import Footer from './Footer'
import About from './About'
import Login from './Login'

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
            return <Loader />
        } else if (!this.state.user.id) {
            return (
                <div>
                    <Header />
                    <About />
                    <Login />
                    <Footer />
                </div>
            )
        } else {
            return (
                <div>
                    <Header />
                    <UserInfo user={this.state.user} />
                    <UserTweet tweetFacts={this.state.tweetFacts} response={this.state.response} />
                    <Graphs data={this.state.response} />
                    <About />
                    {/* <SearchForm /> */}
                    <Footer />
                </div>
            )
        }
    }
}
