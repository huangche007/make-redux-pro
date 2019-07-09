import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ThemeSwitch from './ThemeSwitch'
import { connect } from './m-react-redux'
class Content extends Component {
   /* static contextTypes = {
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
        const {store} = this.context
        const state = store.getState()
        this.setState({
            themeColor:state.themeColor
        })
    }*/
   static propTypes = {
       themeColor:PropTypes.string
   }
    render () {
        return (
            <div>
                <p style={{color:this.props.themeColor}}>手写Redux内容</p>
                <ThemeSwitch />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        themeColor:state.themeColor
    }
}

Content = connect(mapStateToProps)(Content)

export default Content