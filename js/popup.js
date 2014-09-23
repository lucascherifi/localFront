/**
 * Created by nmondon on 23/09/2014.
 */

'use strict';

var $ = require('./bower_components/jquery/dist/jquery.js');
var $body, $enable, $removeUrl, $redirectUrl, $submit;
var preferences;

// first retrieve preferences
chrome.runtime.sendMessage({
    cmd: 'ask_preference',
    preferences: preferences
}, function(pref){
    preferences = pref;
    $(onDomReady);
});

// dom ready listener
var onDomReady = function onDomReady(){
    $body = $('body');
    $enable = $('.disable');
    $removeUrl = $('.remove-url');
    $redirectUrl = $('.redirect-url');
    $submit = $('.submit');
    $submit.on('click', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        // update preferences object
        preferences.enable = $enable.prop('checked');
        preferences.removeUrl = $removeUrl.val();
        preferences.redirectUrl = $redirectUrl.val();

        // send new preferences to the background script
        chrome.runtime.sendMessage({
            cmd: 'save_preference',
            preferences: preferences
        });
    });
    displayPreferences();
};

// display preferences function
var displayPreferences = function displayPreferences(){
    $enable.prop('checked', preferences.enable);
    $removeUrl.val(preferences.removeUrl);
    $redirectUrl.val(preferences.redirectUrl);
};