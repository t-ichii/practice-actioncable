import React from 'react'
// import { Router, Route, Switch } from 'react-router'
import ReactDOM from 'react-dom'

import Chat from './chat'

document.addEventListener("DOMContentLoaded", _e => {
    ReactDOM.render(
        <Chat/>,
        document.getElementById('mount')
    )
})
