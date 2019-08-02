import React, {Component} from 'react';
import axios from 'axios';

class Domens extends Component{
	state = {
		options: false,
		username: false,
	}

	hendleClick = (e) => {
		e.preventDefault();

		axios.post(`${axios.defaults.baseURL}/api/options.php`)
		.then(res => {
			const data = res.data;
			this.setState({ options: data });
			console.log(data)
		})
	}

	domenChange = (e,domen) => {
		e.preventDefault()
		this.props.domenChange(e.target.getAttribute('target'));
	}

	render(props){
		const options = this.props.options;
		const list = Object.keys(options).map(domen => (
  			<li className="py5 flex" key={domen}>
				{domen}
				<div className="flex">
					<i className="fa fa-edit hover-green mx10" target={domen} onClick={this.domenChange}></i>
					<i className="fa fa-close hover-red"></i>
				</div>
			</li>
		))
		return(
			<div className="widget mb30">
				<div className="widget__title flex">
					Домены
					<i className="fa fa-retweet" onClick={this.hendleClick}></i>
				</div>
				<div className="widget__content">
					<ul className="widget__list">
						{list}
					</ul>
				</div>
			</div>
		)
	}
}

export default Domens;
