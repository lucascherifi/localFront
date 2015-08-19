'use strict'

import utilFilter from './utilFilter.js'

let utilReplacement = {

    replaceUrl(filter, url){
        const regStar = /(.*)(\*)(.*)/

        let { urlToReplace, urlReplacement } = filter
        let matchUrlToReplace = urlToReplace.match(regStar)
        let matchUrlReplacement = urlReplacement.match(regStar)

        matchUrlToReplace.shift()
        matchUrlReplacement.shift()

        matchUrlToReplace.forEach( (stToReplace, ind) => {
            !!stToReplace && (url = url.replace(stToReplace, matchUrlReplacement[ind]))
        })

        utilFilter.getNameChangesAsArray(filter).forEach( nc => {
            url = url.replace(nc.nameToReplace, nc.nameReplacement)
        })

        return url
    },

    findFilter(filters, url){
        let filteredFilters  = filters.filter( f => {
            let reg = new RegExp(f.urlToReplace.replace('*', '(.*)'))
            return url.match(reg).length
        })
        if(!filteredFilters.length){
            throw new Error('util/utilReplacement : no filter found')
        }
        return filteredFilters[0]

    }

}

export default utilReplacement