'use strict'

import React, { Component, PropTypes } from 'react'
import utilFilter from '../util/utilFilter.js'

class NameChanges extends Component {

    static propTypes = {
        filter: PropTypes.shape({
            enable: PropTypes.bool.isRequired,
            urlToReplace: PropTypes.string.isRequired,
            urlReplacement: PropTypes.string.isRequired,
            nameChanges: PropTypes.string.isRequired
        })
    }

    render() {

        return (
            <div className="btn-group" role="group">
                {utilFilter.getNameChangesAsArray(this.props.filter).map((el, ind) =>
                        <button type="button"
                                key={ind}
                                className="btn btn-default btn-xs">{`${el.nameToReplace}->${el.nameReplacement}`}</button>
                )}
            </div>


        )
    }
}

export default NameChanges