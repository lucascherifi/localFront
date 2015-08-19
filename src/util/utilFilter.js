'use strict'

let utilFilter = {
    createFilter(){
        return Object.assign({}, {
            enable: true,
            urlToReplace: '',
            urlReplacement: '',
            nameChanges: '',
            // TODO use real uid generator
            id: '' + new Date().getTime()
        })
    },

    getNameChangesAsArray(filter){
        if(!filter.nameChanges){
            return []
        }

        return filter.nameChanges.split(' ').map( nc => {
            let tab = nc.split('=>')
            return {
                nameToReplace: tab[0],
                nameReplacement: tab[1]
            }
        })
    }
}

export default utilFilter