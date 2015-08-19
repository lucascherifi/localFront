'use strict'

import React, { PropTypes, Component } from 'react'

import actions from '../actions/actions.js'
import styleUrl from './styles/styleUrl.js'

class FilterEdit extends Component {

    static propTypes = {
        // current filter
        filter: PropTypes.shape({
            enable: PropTypes.bool.isRequired,
            urlToReplace: PropTypes.string.isRequired,
            urlReplacement: PropTypes.string.isRequired,
            nameChanges: PropTypes.string.isRequired
        }),
        //
        isCreated: PropTypes.bool,
        cancelFunc: PropTypes.func.isRequired
    }

    render() {

        let { isCreated, filter } = this.props
        let { urlToReplace, urlReplacement, nameChanges } = filter

        return (
            <li className={'list-group-item'}>
                <label for="">replace</label>
                <input type="text"
                       defaultValue={urlToReplace}
                       placeholder="http://"
                       ref="urlToReplace"
                       style={styleUrl}/>

                <label for="">by</label>
                <input type="text"
                       defaultValue={urlReplacement}
                       placeholder="http://"
                       ref="urlReplacement"
                       style={styleUrl}/>

                <div className="btn-group" role="group">
                    { isCreated ?
                        <button type="button"
                                onClick={this.handleClickAdd.bind(this)}
                                className="btn btn-default">create
                        </button> :
                        <button type="button"
                                onClick={this.handleClickSave.bind(this)}
                                className="btn btn-default">save
                        </button>
                    }
                    <button type="button"
                            onClick={this.handleClickCancel.bind(this)}
                            className="btn btn-default">cancel
                    </button>
                </div>

                <div>
                    <label for="">name changes</label>
                    <input type="text"
                           defaultValue={nameChanges}
                           placeholder="foo=>bar toto=>tata"
                           ref="nameChanges"
                           style={Object.assign({}, styleUrl, {width: '400px'})}/>
                </div>

            </li>
        )
    }

    handleClickAdd(e){
        e.preventDefault()
        actions.addFilter(
            this.retrieveDataFromRefs()
        )
    }

    handleClickSave(e) {
        e.preventDefault()
        // TODO pretty dirty
        this.props.cancelFunc()
        actions.updateFilter(
            this.retrieveDataFromRefs()
        )
    }

    handleClickCancel(e){
        e.preventDefault()
        this.props.cancelFunc()
    }

    retrieveDataFromRefs() {
        let f = Object.assign({}, this.props.filter, {
            urlToReplace: React.findDOMNode(this.refs.urlToReplace).value,
            urlReplacement: React.findDOMNode(this.refs.urlReplacement).value,
            nameChanges: React.findDOMNode(this.refs.nameChanges).value
        })
        return f
    }
}

export default FilterEdit