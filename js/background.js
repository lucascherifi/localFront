/**
 * Created by nmondon on 23/09/2014.
 */

'use strict';

///////////// global vars

// jquery
var $ = require('./bower_components/jquery/dist/jquery.js');
// default preferences
var preferences;

// executed at the extension installation
chrome.runtime.onInstalled.addListener(function () {
    console.log('on installed');

    // only for *.lefigaro.fr
    var rule1 = {
        conditions: [
            new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostContains: 'lefigaro.fr'}
            })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    };
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([rule1]);
    });

    setup();
});

chrome.runtime.onStartup.addListener(function () {
    console.log('on startup');
    setup();
});

function setup() {
    var filter, actions;

    getPreferences();

    filter = {
        urls: [preferences.removeUrl + '*'],
        types: ['script']
    };

    actions = ['blocking'];

    // intercept request
    if(chrome.webRequest.onBeforeRequest.hasListeners()){
        chrome.webRequest.onBeforeRequest.removeListener(callbackOnBeforeRequest);
    }
    if(preferences.enable){
        chrome.webRequest.onBeforeRequest.addListener(callbackOnBeforeRequest, filter, actions);
    }

    // messages with popup
    if(chrome.runtime.onMessage.hasListeners()){
        chrome.runtime.onMessage.removeListener(callbackOnMessage);
    }
    chrome.runtime.onMessage.addListener(callbackOnMessage);
};

function callbackOnBeforeRequest(details){
    console.log(details);
    var fileName = details.url.match(preferences.removeUrl + '(.*)')[1];
    return {
        redirectUrl: preferences.redirectUrl + fileName
    };
};

function callbackOnMessage(request, sender, sendResponse) {
    // ask preferences
    if (request.cmd === 'ask_preferences') {
        sendResponse(preferences);
    }

    // save preferences
    if (request.cmd === 'save_preferences') {
        setPreferences(request);
        setup();
        sendResponse();
    }
}

function getPreferences() {
    preferences = localStorage.getItem('preferences');

    if (preferences === null) {
        preferences = {
            enable: true,
            removeUrl: 'http://assets5.lefigaro.fr/f1g/build/',
            redirectUrl: 'http://localhost:8000/build/'
        };
    } else {
        preferences = JSON.parse(preferences);
    }
};

function setPreferences(request) {
    preferences = request.preferences;
    localStorage.setItem('preferences', JSON.stringify(preferences));
};