import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const Profile = props => {
  let [secretMessage, setSecretMessage] = useState('')

  useEffect(() => {
    // Get the token from local storage
    let token = localStorage.getItem('boilerToken')

    // Mkae a call to protected route
    fetch(process.env.REACT_APP_SERVER_URL + 'profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Response', response)

      // Mkae sure we got a good response
      if (!response.ok) {
        setSecretMessage('Nice Try!')
        return
      }

      // We did get a good response
      response.json()
      .then(result => {
        console.log(result)
        setSecretMessage(result.message)
      })
    })
    .catch(err => {
      console.log(err)
      setSecretMessage('No message for you!')
    })
  })

// Make sure there is a user before trying to show their info
  if (!props.user){
    return <Redirect to="/login" />
  }

  return (
    <div>
      <h2>
        {props.user.firstname}
      </h2>
      <img src={props.user.pic} alt={props.user.firstname} /> 
      <h2>{secretMessage}</h2>
    </div>
  )
}

export default Profile
