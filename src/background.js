'use strict'
/* global chrome */

import _ from 'lodash'
import minimatch from 'minimatch'
import utilPreferences from './util/utilPreferences.js'
import utilReplacement from './util/utilReplacement.js'
import constants from './util/constants.js'

// Fired when the extension is first installed, when the extension is updated to a new version,
// and when Chrome is updated to a new version.
//
// Store default preferences and setup
// if urlToRedirect contains
chrome.runtime.onInstalled.addListener(() => {
    utilPreferences.clean()
    setupRedirection()
    setupConnectionWithPopup()
})

// Fired when a profile that has this extension installed first starts up.
// This event is not fired when an incognito profile is started, even if this extension is operating in 'split' incognito mode.
//
// Load preferences stored in chrome.storage and setup
chrome.runtime.onStartup.addListener(() => {
    setupRedirection()
    setupConnectionWithPopup()
})


function onBeforeRequest(details) {
    let preferences = utilPreferences.get()
    let filters = preferences.filters.filter( f => f.enable )
    let currentFilter = utilReplacement.findFilter(filters, details.url)
    let newUrl = utilReplacement.replaceUrl(currentFilter, details.url)
    return {
        redirectUrl: newUrl
    }
}


// Remove existant listeners if defined.
// Create new listeners if preferences.enable.
// There are 2 listeners :
//
// * onBeforeRequest : to catch matching urls and ask for a redirection
// * onMessage : to replace matching urls by their redirections
function setupRedirection() {
    let preferences = utilPreferences.get()
    let filters = preferences.filters.filter( f => f.enable )
    let filter = {
        urls: filters.map( f => f.urlToReplace )
    }
    let actions = ['blocking']

    // remove onBeforeRequest cb
    if(chrome.webRequest.onBeforeRequest.hasListener(onBeforeRequest)){
        chrome.webRequest.onBeforeRequest.removeListener(onBeforeRequest)
    }

    // if global preferences are enable, we add the redirection listener
    if(preferences.enable && filters.length){
        chrome.webRequest.onBeforeRequest.addListener( onBeforeRequest, filter, actions )
    }

    if(chrome.webRequest.onBeforeRequest.hasListeners()){
        console.log('il y a des listeners')
    }

    chrome.browserAction.setIcon({
        path: 'images/' + (preferences.enable ? 'favicon.png' : 'faviconNoColor.png')
    })

}

function setupConnectionWithPopup(){
    function onMessage(request, sender, sendResponse){
        switch(request.cmd){
            case constants.CMD_ASK_PREFERENCES:
                sendResponse(utilPreferences.get())
                break
            case constants.CMD_SET_PREFERENCES:
                utilPreferences.set(request.preferences)
                setupRedirection()

                break
            default :
                throw new Error('background : message not defined')
        }
    }

    chrome.runtime.onMessage.hasListeners() && chrome.runtime.onMessage.removeListener( onMessage )
    chrome.runtime.onMessage.addListener( onMessage )
}