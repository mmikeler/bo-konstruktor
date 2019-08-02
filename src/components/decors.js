import React, {Component} from 'react';
import axios from 'axios';

class Decors extends Component{
	state = {
		title: 'Декоры',
		decors: false
	}

	hendleClick = (e) => {
		e.preventDefault();

		axios.post(`${axios.defaults.baseURL}/api/options.php`)
		.then(res => {
			const data = res.data;
			this.setState({ decors: data });
			console.log(data)
		})
	}

	loadData = () => {
		axios.post(`${axios.defaults.baseURL}/api/orders.php`, 1)
		.then(res => {
			const data = res.data;
			this.setState({ decors: data });
		})
	}

	componentWillMount(){
		this.loadData();
	}

	render(props){
		const decors = this.state.decors;
		const list = decors ? Object.keys(decors).map(decor => (
  			<li className="py5 flex" key={decor}>
  				<div className="list-item__title">
  					<span>{decors[decor].title}</span><br />
  					<span className="under-title">art: {decor}</span>
				</div>
				<div className="flex">
					<i className="fa fa-plus hover-green mx10"></i>
				</div>
			</li>
		)) : '';
		return(
			<div className="widget mb30">
				<div className="widget__title flex">
					{this.state.title}
					<i className="fa fa-search"></i>
				</div>
				<div className="widget__content flex">
					{ this.state.decors ?
						<ul className="widget__list w100p">
							{list}
						</ul>
						:
						<i className="fas fa-sync-alt spinner ma"></i>
					}
				</div>
			</div>
		)
	}
}

export default Decors;
