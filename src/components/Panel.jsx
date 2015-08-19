'use strict'

import React, {Component, PropTypes} from 'react'
import {branch} from 'baobab-react/decorators'

import Filter from './Filter.jsx'
import actions from '../actions/actions.js'
import utilPreferences from '../util/utilPreferences.js'

@branch({
    cursors: {
        enable: 'enable',
        filters: 'filters',
        newFilter: 'newFilter'
    }
})
class Panel extends Component {

    static propTypes = {
        enable: PropTypes.bool.isRequired,
        filters: PropTypes.array.isRequired,
        newFilter: PropTypes.object
    }

    render(){

        let { filters, enable, newFilter } = this.props

        return (
            <div className={'container'}>
                <div className="page-header">
                    <h3>localFront <small>a tiny tool for url redirection</small></h3>
                </div>

                <div className="btn-group" role="group" style={{
                    marginBottom: '10px'
                }} >
                    <button type="button"
                            onClick={this.handleClickAdd.bind(this)}
                            className="btn btn-default">Add a filter</button>
                    <button type="button"
                            onClick={this.handleClickToggleEnable.bind(this)}
                            className="btn btn-default">{enable ? 'enabled' : 'disabled'}</button>

                </div>

                <ul className="list-group">
                    {!!newFilter && <Filter filter={newFilter} key={'new filter'} isCreated={true}  />}
                    {filters.map( (f, key) => <Filter filter={f} key={key} /> )}
                </ul>
            </div>
        )
    }

    handleClickAdd(e){
        e.preventDefault()
        actions.initNewFilter()
    }

    handleClickToggleEnable(e){
        e.preventDefault()
        actions.toggleEnable()
    }


}

export default Panel