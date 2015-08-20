'use strict'

import utilFilter from './utilFilter.js'

let utilReplacement = {

    // Finds the filter matching to the current url caught by chrome API.
    findFilter(filters, url){
        let filteredFilters = filters.filter(f => {
            let reg = new RegExp(f.urlToReplace.replace(/\*/g, '(.*)'))
            return url.match(reg).length
        })
        if (!filteredFilters.length) {
            throw new Error('util/utilReplacement : no filter found')
        }
        return filteredFilters[0]

    },

    // Replaces url in function of the filter setted.
    // Basically, we build a regexp from the glob pattern.
    replaceUrl(filter, url){

        let { urlToReplace, urlReplacement } = filter

        // ([^\*]*)
        let everythingButAStar = '([^\\*]*)'
        // (\*)
        let stars = '\\*'

        // we build a regexp like *everything but a star* +
        // for each stars found : *stars* + *everything but a star*
        let regStar =
            new RegExp(everythingButAStar + urlToReplace.match(new RegExp(stars)).map(
                        s => stars + everythingButAStar
                ))


        let matchUrlToReplace = urlToReplace.match(regStar)
        let matchUrlReplacement = urlReplacement.match(regStar)

        matchUrlToReplace.shift()
        matchUrlReplacement.shift()

        matchUrlToReplace.forEach((stToReplace, ind) => {
            !!stToReplace && (url = url.replace(stToReplace, matchUrlReplacement[ind]))
        })

        utilFilter.getNameChangesAsArray(filter).forEach(nc => {
            url = url.replace(nc.nameToReplace, nc.nameReplacement)
        })

        return url
    }

}

export default utilReplacement