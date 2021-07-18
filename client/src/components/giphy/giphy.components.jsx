import React, { Component } from 'react';
import { GiphySearch, GiphyItem } from './giphy.styles.js'
import './giphy.styles.css'


class Giphy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gifs: [],
			searchHistory: [],
			search: 'trending'

		};
	}

	componentDidMount() {
		this.getAPI();
	}

	getAPI() {
		console.log('getapi', this.state.search);
		let api = fetch('https://api.giphy.com/v1/gifs/search?api_key=f4ee250fb7fc4ccf88cc2260099165c8&q=' + this.state.search + '&limit=25&offset=0&rating=G&lang=en')
			.then((response) => response.json())
			.then((responseJson) => {
				if (this.state.searchHistory.indexOf(this.state.search) < 0) {
					this.setState({ gifs: responseJson.data, searchHistory: [this.state.search, ...this.state.searchHistory] });
				} else {
					this.setState({ gifs: responseJson.data });
				}
			})
			.catch((error) => {
				console.error(error);
			});

		// https://api.giphy.com/v1/gifs/search?api_key=f4ee250fb7fc4ccf88cc2260099165c8&q=puppies&limit=25&offset=0&rating=G&lang=en
	}

	handleClick = (e) => {
		// if click is from sidebar
		if (typeof e === 'string') {
			this.setState({ search: e }, () => {
				this.getAPI();
			});
			return;
		}
		console.log('key', e.key, e, e.target, e.target.key, e.target.value);

		// if click is from search form
		if (e.key === 'Enter' || e.target.value === 'Go') {
			this.getAPI();
		}
	}
	handleChange = (e) => {
		this.setState({ search: e.target.value });
	}
	handleFocus = (e) => {
		e.target.value = '';
	}
	handleSubmit = (e) => {
		e.preventDefault();
	}
	handleBlur = (e) => {
		e.target.value = this.state.search;
	}

	render() {
		let gifs = this.state.gifs;
		let history = this.state.searchHistory;

		return (
			<main className="giphy">

				<GiphySearch>
					<h1>#</h1>
					<form className='search' onSubmit={this.handleSubmit}>
						<input placeholder="search for a keyword" className="search__field" type="text" value={this.state.search} onChange={this.handleChange} onKeyPress={this.handleClick} onFocus={this.handleFocus} onBlur={this.handleBlur} />
					</form>
				</GiphySearch>

				<section>

					<section className="giphy-history">
						<h2>Search History</h2>
						<ul>
							{
								history.map((item, ind) => (
									<li key={`${ind}${item}`} onClick={() => this.handleClick(item)} value={item}>#{item}</li>
								))
							}
						</ul>
					</section>

					<div className="card-container">
						{
							this.state.gifs &&
							gifs.map(item => (
								<GiphyItem key={item.id}>
									<p><a href={item.bitly_url} target="_blank" rel="noopener">{item.title}</a></p>
									<a href={item.bitly_url} target="_blank" rel="noopener"><img src={item.images.preview_gif.url} alt="" /></a>

									{/*"import_datetime": "2014-01-09 15:05:31",*/}
									{/*"trending_datetime": "2017-04-11 18:49:07",*/}
									<p><a href={item.bitly_url} target="_blank" rel="noopener"></a>
										<a href={item.bitly_url} rel="noopener"></a>
										<a href={item.bitly_url} rel="noopener"></a>
									</p>
								</GiphyItem>
							))
						}
					</div>

				</section>

			</main>
		);
	}
}

export default Giphy;