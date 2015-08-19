'use strict'

import tree from '../store.js'
import _ from 'lodash'

import utilPreferences from '../../util/utilPreferences.js'

let serviceStore = {
    initStore(preferencesFromBackground){
        tree.set(preferencesFromBackground)
        tree.commit()
    },

    initNewFilter(){
        tree.select('newFilter')
            .set(utilPreferences.getDefaultFilter())
        tree.commit()
    },

    cancelCreation(){
        tree.set('newFilter', null)
        tree.commit()
    },

    updateFilter(filter) {
        tree
            .select('filters', {id: filter.id})
            .set(filter)
        tree.commit()
    },

    addFilter(filter){
        tree
            .update({
                'filters': {
                    $unshift: [filter]
                },
                'newFilter': {
                    $set: null
                }
            })
        tree.commit()
    },

    removeFilter(filter){
        let index = _.findIndex( tree.select('filters').get(), {id: filter.id})
        tree
            .update({
                'filters': {
                    $splice: [[index, 1]]
                }
            })

        tree.commit()
    },

    toggleEnable(){
        let cursor = tree.select('enable')
        cursor
            .set(!cursor.get())
        tree.commit()
    }
}

export default serviceStore