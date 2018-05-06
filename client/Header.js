import React from 'react'

const Header = () => {
    const randomEmoji = () => {
    let randomCharCode = Math.floor(Math.random() * 38) + 1
    let rE

    if (randomCharCode < 10) {
        rE = String.fromCodePoint('0x1F60' + randomCharCode.toString())
    } else {
        rE = String.fromCodePoint('0x1F6' + randomCharCode.toString())
    }
    return rE
    }

    return (
        <div className="section header">
            <div className="emoticons">
                <h1>{randomEmoji()}</h1><h1>{randomEmoji()}</h1><h1>{randomEmoji()}</h1>
            </div>
            <div>
                <h1> BIG MOODS </h1>
            </div>
            <div className="emoticons">
                <h1>{randomEmoji()}</h1><h1>{randomEmoji()}</h1><h1>{randomEmoji()}</h1>
            </div>
        </div>
    )
}

export default Header