'use strict'

import React, { PropTypes, Component } from 'react'

class Check extends Component {

    static propTypes = {
        isChecked: PropTypes.bool.isRequired,
        action: PropTypes.func.isRequired
    }

    handleClick(){
        this.props.action(!this.props.isChecked)
    }

    render(){

        let { isChecked } = this.props

        return (
            <span
                onClick={this.handleClick.bind(this)}
                style={{
                border: 'black solid 1px',
                backgroundColor: isChecked ? 'black' : 'white',
                width: '10px',
                height: '10px',
                display: 'inline-block',
                margin: '0 5px'
            }}>
            </span>
        )
    }

}

export default Check
