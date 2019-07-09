import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ThemeSwitch from './ThemeSwitch'
import { connect } from '../m-react-redux'

class Content extends Component {
    static propTypes = {
        themeColor: PropTypes.string
    }

    render () {
        return (
            <div>
                <p style={{ color: this.props.themeColor }}>手写Redux内容</p>
                <ThemeSwitch />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
}
export default connect(mapStateToProps)(Content)