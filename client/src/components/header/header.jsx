import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {HiArrowRight} from 'react-icons/hi';
import './header.styles.css';

class Header extends Component {
	constructor(props){
		super(props);
		this.state={
			page:'',
			linkName:''
		};
	}

	componentDidMount(){
		// console.log('props',location.pathname,this.props,this.props.path.slice(this.props.path.lastIndexOf('/')+1));
		let page=this.props.path.slice(this.props.path.lastIndexOf('/')+1);
		if(page==='giphy'){
			this.setState({page:'Giphy',linkName:'Reddit'});
		}else{
			this.setState({page:'Reddit',linkName:'Giphy'});
		}
	}
	
	handleClick=(e)=>{
		if(this.page==='giphy'){
			this.setState({page:'Reddit',linkName:'Giphy'});
		}else{
			this.setState({page:'Giphy',linkName:'Reddit'});
		}
	}

	render() {
		let page=this.state.page;
		let linkName=this.state.linkName;
		return (
		  <header className="App-header">
			  <nav>
				  <Link to={`/${linkName.toLowerCase()}`} onClick={this.handleClick}>
					  <div className='link'>{linkName} <HiArrowRight/> </div>
				  </Link>
			  </nav>
			  <h1 className="App-title">Hello, {page}!</h1>
		  </header>
		);
	}
}

export default Header;