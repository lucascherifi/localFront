'use strict'

import serviceStore from '../store/services/serviceStore.js'

let actions = {

    initNewFilter(){
        serviceStore.initNewFilter()
    },

    cancelCreation(){
        serviceStore.cancelCreation()
    },

    addFilter(f){
        serviceStore.addFilter(f)
    },

    updateFilter(filter){
        serviceStore.updateFilter(filter)
    },

    removeFilter(filter){
        serviceStore.removeFilter(filter)
    },

    toggleEnable(){
        serviceStore.toggleEnable()
    }

}

export default actions