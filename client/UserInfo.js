import React from 'react'

const UserInfo = props => {
    const {user} = props
    return (
        <div className="section info">
            <img src={user.photos[0].value} id="avi" />
            <div id="userNames">
                <h2>{user.displayName}</h2>
                <h3>@{user.username}</h3>
            </div>
        </div>
    )
}

export default UserInfo
