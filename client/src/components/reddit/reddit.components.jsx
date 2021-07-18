import React from 'react';
import {RedditSearch,RedditItem} from './reddit.styles'
import './reddit.styles.css';

class Reddit extends React.Component {
	constructor(props){
		super(props);
		this.state={
			data:{},
			items:[],
			search:'awww'
		};
	}

	componentDidMount(){
		this.getAPI();
	}

	getAPI(){
		let api=fetch('https://www.reddit.com/r/'+this.state.search+'/new.json?sort=new')
		.then((response) => response.json())
		.then((responseJson) => {
			console.log(responseJson.data.children);
			this.setState({data: responseJson, items: responseJson.data.children});
			// this.setState({items: responseJson.data.children});
		})
		.catch((error) => {
			console.error(error);
		});
	}

	handleClick=(e)=>{
		console.log(e.key);
		if(e.key == 'Enter' || e.target.value==='Go'){
			this.getAPI();
		}
	}
	handleChange=(e)=>{
		console.log(e.target.value);
		this.setState({search:e.target.value});
	}
	handleFocus=(e)=>{
		e.target.value='';
	}
	handleSubmit=(e)=>{
		e.preventDefault();
	}
	handleBlur=(e)=>{
		e.target.value=this.state.search;
	}

	render() {
		return (
			<main className="reddit">


				<RedditSearch>
					<h1>/r/</h1>
					<form className='search' onSubmit={this.handleSubmit}>
						<input placeholder="search for a keyword" className="search__field" type="text" defaultValue={this.state.search} onChange={this.handleChange} onKeyPress={this.handleClick} onFocus={this.handleFocus} onBlur={this.handleBlur}  />
					</form>
				</RedditSearch>


				<section className="reddit-list">
					{
						this.state.items &&
						this.state.items.map(item => (
						  <RedditItem key={item.data.id}>
							  <p><a href={`https://www.reddit.com/${item.data.subreddit_name_prefixed}`} target="_blank" rel="noopener">{item.data.subreddit_name_prefixed}</a></p>

							  <p><a href={`https://www.reddit.com/u/${item.data.author}`} target="_blank" rel="noopener">u/{item.data.author}</a></p>

							  {
								  item.data.thumbnail &&
								  <a href={`https://www.reddit.com/${item.data.permalink}`} target="_blank" rel="noopener"><img src={item.data.thumbnail} alt="" /></a>
							  }

							  {
								  item.data.url==='' &&
								  <a href={`https://www.reddit.com/${item.data.permalink}`} target="_blank" rel="noopener"><img src={item.data.url} alt="" /></a>
							  }

							  <h3><a href={`https://www.reddit.com/${item.data.permalink}`} target="_blank" rel="noopener">{item.data.title}</a></h3>

							  <p>Comments {item.data.num_comments}</p>
						  </RedditItem>
						))
					}
				</section>


			</main>
		);
	}
}

export default Reddit;