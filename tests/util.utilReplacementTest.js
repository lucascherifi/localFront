import {should, expect, assert} from 'chai'

import utilReplacement from '../src/util/utilReplacement.js'
import utilPreferences from '../src/util/utilPreferences.js'

describe('utilReplacement', () => {

    describe('replaceUrl', () => {

        it('should replace an url toto/test.js with a filter toto/* => tutu/*', () => {
            let filter = Object.assign({}, utilPreferences.getDefaultFilter(), {
                urlToReplace: 'http://toto/*',
                urlReplacement: 'http://tutu/*'
            })

            let url = 'http://toto/test.js'
            let replacedUrl = utilReplacement.replaceUrl(filter, url)

            assert.equal(replacedUrl, 'http://tutu/test.js')
        })

        it('should replace an url toto/test.js with a filter toto/*.js => tutu/*.js', () => {
            let filter = Object.assign({}, utilPreferences.getDefaultFilter(), {
                urlToReplace: 'http://toto/*.js',
                urlReplacement: 'http://tutu/*.js'
            })

            let url = 'http://toto/test.js'
            let replacedUrl = utilReplacement.replaceUrl(filter, url)

            assert.equal(replacedUrl, 'http://tutu/test.js')
        })

    })

    describe('findFilter', () => {

        it('should find a matching filter with a multi dir glob', () => {
            let filter = Object.assign({}, utilPreferences.getDefaultFilter(), {
                urlReplacement: "http://zefrqf.f1g.fr/*",
                urlToReplace: "http://a.f1g.fr/*",
            })

            let url = 'http://a.f1g.fr/assets-css/hp/01-fig-hp.css?d68e300afdfcbd441e03df8f41ba90bb88bfff45'

            let foundFilter = utilReplacement.findFilter([filter], url)

            console.log(foundFilter)

            assert.isDefined(foundFilter)

        })

        it('should find a matching filter with a simple dir glob', () => {
            let filter = Object.assign({}, utilPreferences.getDefaultFilter(), {
                urlReplacement: "http://zefrqf.f1g.fr/*",
                urlToReplace: "http://a.f1g.fr/*",
            })

            let url = 'http://a.f1g.fr/assets-css'

            let foundFilter = utilReplacement.findFilter([filter], url)

            console.log(foundFilter)

            assert.isDefined(foundFilter)
        })

        it('should find a matching filter with a url', () => {
            let filter = Object.assign({}, utilPreferences.getDefaultFilter(), {
                urlReplacement: "http://zefrqf.f1g.fr/toto.js",
                urlToReplace: "http://a.f1g.fr/tata.js",
            })

            let url = 'http://a.f1g.fr/tata.js'

            let foundFilter = utilReplacement.findFilter([filter], url)

            console.log(foundFilter)

            assert.isDefined(foundFilter)

        })

        it('should find a matching filter with a cache killer glob', () => {
            let filter = Object.assign({}, utilPreferences.getDefaultFilter(), {
                urlReplacement: "http://zefrqf.f1g.fr/toto.js?*",
                urlToReplace: "http://a.f1g.fr/tata.js?*",
            })

            let url = 'http://a.f1g.fr/tata.js?aefqzefqezfqzef'

            let foundFilter = utilReplacement.findFilter([filter], url)

            console.log(foundFilter)

            assert.isDefined(foundFilter)

        })

    })

})