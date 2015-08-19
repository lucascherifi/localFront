'use strict'

import React, { Component, PropTypes } from 'react'

import actions from '../actions/actions.js'
import styleUrl from './styles/styleUrl.js'
import Check from './Check.jsx'
import FilterEdit from './FilterEdit.jsx'
import NameChanges from './NameChanges.jsx'

class Filter extends Component {

    static propTypes = {
        // current filter
        filter: PropTypes.shape({
            enable: PropTypes.bool.isRequired,
            urlToReplace: PropTypes.string.isRequired,
            urlReplacement: PropTypes.string.isRequired
        }),
        //
        isCreated: PropTypes.bool
    }

    // props isCreated is not mandatory. If setted, we go straight in an edition mode
    constructor(props) {
        super()
        this.state = {
            isEdited: !!props.isCreated
        }
    }

    render() {

        let { enable, urlToReplace, urlReplacement } = this.props.filter
        let { isEdited } = this.state

        if (isEdited) {
            return <FilterEdit {...this.props}
                cancelFunc={this.props.isCreated ? this.cancelCreation.bind(this) : this.cancelEdition.bind(this)} />
        }

        return (
            <li className={"list-group-item " + (enable ?  '' : 'list-group-item-danger' )}>
                <label for="">replace</label>
                <p onClick={this.handleClickEdit.bind(this)}
                   style={styleUrl}>{urlToReplace}</p>

                <label for="">by</label>
                <p onClick={this.handleClickEdit.bind(this)}
                   style={styleUrl}>{urlReplacement}</p>

                <Check action={this.handleClickCheck.bind(this)} isChecked={enable}/>

                <div className="btn-group" role="group">
                    <button type="button"
                            onClick={this.handleClickRemove.bind(this)}
                            className="btn btn-default">remove
                    </button>
                    <button type="button"
                            onClick={this.handleClickEdit.bind(this)}
                            className="btn btn-default">edit
                    </button>
                </div>

                <NameChanges {...this.props} />

            </li>
        )

    }

    // If end of an editing, we retrieve data and launch an action.
    // Toggles isEdited state.
    handleClickEdit(e) {
        e.preventDefault()
        this.setState({
            isEdited: true
        })
    }

    handleClickCheck(newEnable) {
        actions.updateFilter(Object.assign({}, this.props.filter, {
            enable: newEnable
        }))
    }

    handleClickRemove(e){
        e.preventDefault()
        actions.removeFilter(this.props.filter)
    }

    //
    cancelCreation() {
        actions.cancelCreation()
    }

    //
    cancelEdition() {
        this.setState({
            isEdited: false
        })
    }


}

export default Filter