import React,{Component} from 'react'
import PropTypes from 'prop-types'
export const connect = (mapStateToProps,mapDispatchToProps)=> (WrappedComponent) => {
    class Connect extends Component{
        static contextTypes= {
            store:PropTypes.object
        }
        constructor(){
            super()
            this.state = {
                allProps:{}
            }
        }
        componentWillMount(){
            const {store}  = this.context
            this._updateProps()
            store.subscribe(()=>{
                this._updateProps()
            })
        }
        _updateProps(){
           /* const { store } = this.context
            let stateProps = mapStateToProps(store.getState(), this.props) // 额外传入 props，让获取数据更加灵活方便
            this.setState({
                allProps: { // 整合普通的 props 和从 state 生成的 props
                    ...stateProps,
                    ...this.props
                }
            })*/
            const { store } = this.context
            let stateProps = mapStateToProps
                ? mapStateToProps(store.getState(), this.props)
                : {} // 防止 mapStateToProps 没有传入
            let dispatchProps = mapDispatchToProps
                ? mapDispatchToProps(store.dispatch, this.props)
                : {} // 防止 mapDispatchToProps 没有传入
            this.setState({
                allProps: {
                    ...stateProps,
                    ...dispatchProps,
                    ...this.props
                }
            })
        }
        render(){
            // const {store} = this.context
            // let stateProps = mapStateToProps(store.getState())
            return <WrappedComponent {...this.state.allProps} />
        }
    }
    return Connect
}

/**
 * Provider 做的事情也很简单，它就是一个容器组件，会把嵌套的内容原封不动作为自己的子组件渲染出来。
 * 它还会把外界传给它的 props.store 放到 context，这样子组件 connect 的时候都可以获取到。
 */
export class Provider extends Component{
    static propTypes = {
        store:PropTypes.object,
        children:PropTypes.any
    }

    static childContextTypes = {
        store:PropTypes.object
    }

    getChildContext(){
        return {
            store:this.props.store
        }
    }

    render(){
        return(
            <div>{this.props.children}</div>
        )
    }

}

