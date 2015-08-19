'use strict'
/* global chrome */

import React from 'react'
import $ from 'jquery'

import Container from './components/Container.jsx'
import constants from './util/constants.js'
import serviceStore from './store/services/serviceStore.js'
import tree from './store/store.js'


chrome.runtime.sendMessage({
    cmd: constants.CMD_ASK_PREFERENCES,
}, (preferences) => {

    // we set the store with the chrome storage
    serviceStore.initStore(preferences)
    // we render our ui
    React.render(
        <Container />,
        document.querySelector('#container')
    )
    // on each store's update, we save it on the chrome storage
    tree.on('update', ()=> {

        chrome.runtime.sendMessage({
            cmd: constants.CMD_SET_PREFERENCES,
            preferences: tree.get()
        })
    })
})