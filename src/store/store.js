'use strict'

import Baobab from 'baobab'
import constants from '../util/constants.js'

let tree = new Baobab({
    enable: false,
    filters: [],
    newFilter: null
}, {
    autoCommit: false,
    aysnchronnous: false,
    facets: {

    }
})

export default tree