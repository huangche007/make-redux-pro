# 手写实现一个Redux
> 核心点：state\prop\store\action\dispatch\creatStore\reducer\dumb component\smart component

## state&prop
一个组件的数据主要有两种表现形式：

- 自身的state数据
- 父组件传递传递的prop数据

## store&creatStore&dispatch&action&reducer
**Store**扮演着针对应用全局状态(数据)进行管理的一个角色，而我们在进行数据的修改的时候，是需要遵循一定的规则进行的,这时候就需要**dispatch**一个**action**了。那么这里了**action**是怎么来的了？那就需要**creatStore**出场了，**createStore**是一个需要传递**reducer**的函数,通过订阅模式来进行监听器的注册，**state**的初始化以及**dispatch**一个进行**state**的更新、监听器的遍历执行。
最终返回一个拥有getState、dispatch、subscribe的store对象。

	function createStore(reducer) {
	    let state = null;
	    const listeners = [];
	    const subscribe = (listener) => listeners.push(listener)
	    const getState = ()=>state
	    const dispatch = (action) =>{
	        state = reducer(state,action)
	        listeners.forEach((listener)=>listener())
	    }
	    dispatch({})//初始化state
	    return {getState,dispatch,subscribe}
	}
那么上面提到了**reducer**，它是做什么的呢，其实我们就可以通过它来对state进行初始化及更新的操作

	const themeReducer = (state,action) =>{
	    if(!state){
	        return{
	            themeColor:'red'
	        }
	    }
	    switch (action.type){
	        case 'CHANGE_COLOR':
	            return {...state,themeColor:action.themeColor}
	        default:
	            return state
	    }
	}

	const store = createStore(themeReducer)


## Smart Component&Dumb Component
针对某一个页面进行划分编写的时候，我们需要去衡量这个页面的划分原则，如是否复用性较强等，去将某个页面可能具有的多个组件进行划分,分为Dumb和Smart组件，一般地会分别把它们放到components 和 containers 目录下。


	   components

	     Dumb

如src--->components--->Header

	import React,{Component} from 'react'
	import PropTypes from 'prop-types'
	export default class Header extends Component{
	    static propTypes = {
	        themeColor:PropTypes.string
	    }
	    render () {
	        return (
	            <h1 style={{color:this.props.themeColor}}>手写Redux Header</h1>
	        )
	    }
	}

上面的header就是一个Dumb组件，只根据props进行数据的渲染

       containers

		 Smart

如src--->containers--->Header

	import { connect } from '../m-react-redux'
	import Header from '../components/Header'

	const mapStateToProps = (state) => {
	    return {
	        themeColor: state.themeColor
	    }
	}
	export default connect(mapStateToProps)(Header)

把上面dumb中Header组件组合,通过props来控制它

那么dumb组件与smart组件有什么区别呢？

- Dumb 基本只做一件事情 —— 根据 props 进行渲染。而 Smart 则是负责应用的逻辑、数据，把所有相关的 Dumb（Smart）组件组合起来，通过 props 控制它们

- Smart 组件可以使用 Smart、Dumb 组件；而 Dumb 组件最好只使用 Dumb 组件，否则它的复用性就会丧失。

- 要根据应用场景不同划分组件，如果一个组件并不需要太强的复用性，直接让它成为 Smart 即可；否则就让它成为 Dumb 组件。

还有一点要注意，Smart 组件并不意味着完全不能复用，Smart 组件的复用性是依赖场景的，在特定的应用场景下是当然是可以复用 Smart 的。而 Dumb 则是可以跨应用场景复用，Smart 和 Dumb 都可以复用，只是程度、场景不一样。






