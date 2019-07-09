import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from './m-react-redux'
class Header extends Component {
    /*static contextTypes = {
        store:PropTypes.object
    }

    constructor(){
        super()
        this.state = {
            themeColor:''
        }
    }
    componentWillMount(){
        const {store} = this.context
        this._updateThemeColor();
        store.subscribe(()=>this._updateThemeColor())
    }
    _updateThemeColor(){
        const {store} = this.context;
        const state = store.getState()
        console.log('state:',state)
        this.setState({
            themeColor:state.themeColor
        })
    }*/
    static propTypes = {
        themeColor:PropTypes.string
    }
    render () {
        return (
            <h1 style={{color:this.props.themeColor}}>手写Redux Header</h1>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        themeColor:state.themeColor
    }
}

Header = connect(mapStateToProps)(Header)

export default Header