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
            {/* <div className="emoticons">
                <h3>{randomEmoji()}</h3><h3>{randomEmoji()}</h3><h3>{randomEmoji()}</h3>
            </div> */}
            {/* <marquee><h3>{randomEmoji()}</h3><h3>{randomEmoji()}</h3><h3>{randomEmoji()}</h3></marquee> */}
            <div id="headertxt" className="jump">
                <span className="skew">B</span>
                    I
                    <span className="skew">G</span>
                     
                    <span className="skew">M</span>
                    O
                    <span className="skew">O</span>
                    D
                    <span className="skew">S</span>
            </div>
            {/* <div className="emoticons">
                <h3>{randomEmoji()}</h3><h3>{randomEmoji()}</h3><h3>{randomEmoji()}</h3>
            </div> */}
        </div>
    )
}

export default Header