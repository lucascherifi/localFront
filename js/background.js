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

    preferences = {
        enable: true,
        removeUrl: 'http://assets5.lefigaro.fr/f1g/build/',
        redirectUrl: 'http://localhost:8000/build/'
    };

    filter = {
        urls: [preferences.removeUrl + '*'],
        types: ['script']
    };

    actions = ['blocking'];

    // intercept request
    chrome.webRequest.onBeforeRequest.addListener(function (details) {
            console.log(details);
            var fileName = details.url.match(preferences.removeUrl + '(.*)')[1];
            return {
                redirectUrl: preferences.redirectUrl + fileName
            };
        }, filter, actions
    );

    // ask preference
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        sendResponse(preferences);
    });

};