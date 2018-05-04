import React from 'react'

class Loader extends React.Component {
    constructor() {
    super()
    this.state = {
        randomEmoji: '',
        intervalEmoji: ''
    }

    this.randomEmoji = this.randomEmoji.bind(this)
    }

    componentDidMount() {
        let intervalEmoji = setInterval(this.randomEmoji, 500)

        this.setState({intervalEmoji})
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalEmoji);
    }

    randomEmoji() {
        let randomCharCode = Math.floor(Math.random() * 38) + 1
        let randomEmoji

        if(randomCharCode < 10) {
            randomEmoji = String.fromCodePoint('0x1F60' + randomCharCode.toString())
        } else {
            randomEmoji = String.fromCodePoint('0x1F6' + randomCharCode.toString())
        }

        this.setState({randomEmoji})
    }
    render() {
        return (
            <div id="loader">
                <div id="loaderDiv">
                    {this.state.randomEmoji}
                </div>
            </div>
        )
    }
}

export default Loader