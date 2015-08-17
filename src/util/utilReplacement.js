'use strict'

let utilReplacement = {

    replaceUrl(filter, url){
        const regStar = /(.*)(\*)(.*)/

        let { urlToReplace, urlReplacement } = filter
        let matchUrltoReplace = urlToReplace.match(regStar)
        let matchUrlReplacement = urlReplacement.match(regStar)

        matchUrltoReplace.shift()
        matchUrlReplacement.shift()

        matchUrltoReplace.forEach( (stToReplace, ind) => {
            !!stToReplace && (url = url.replace(stToReplace, matchUrlReplacement[ind]))
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