'use strict'
/* global window */

import constants from './constants.js'

let utilPreferences = {

    // Returns a promise returning preferences stored in chrome storage.
    // If preferences are not defined into the store, provides default preferences
    //
    // filters is an array of litterals like below :
    // ```javascript
    // {
    //      enable: <boolean>,
    //      urlToReplace: <string>,
    //      urlReplacement: <string>,
    //      id: <string>,
    //      namesChanges: <string>
    // }
    // ```
    get() {
        let preferences = window.localStorage.getItem(constants.PREFERENCES_KEY)
        if(!!preferences){
            return JSON.parse(preferences)
        }
        return {
            enable: false,
            filters: []
        }
    },

    // Set preferences
    set(preferences){
        window.localStorage.setItem(constants.PREFERENCES_KEY, JSON.stringify(preferences))
    },

    clean(){
        window.localStorage.clear()
    }

}

export default utilPreferences