'use strict'

import React, { Component, PropTypes } from 'react'
import {root} from 'baobab-react/decorators'

import Panel from './Panel.jsx'
import tree from '../store/store.js'

@root(tree)
class Container extends Component {

    render(){
        return (
            <div>
                <Panel />
            </div>
        )
    }

}

export default Container