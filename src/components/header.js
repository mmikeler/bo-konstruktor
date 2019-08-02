import React, {Component} from 'react';
import Login from './login';

class Header extends Component {
	state = {
		islogged: false
	}

	render(props){
		return(
			<header className="flex">
				<div className="main-menu"><i className="fa fa-bars white"></i></div>
				<img className="header-logo" src="logo-construct.png" alt="Be-Конструктор" />
				<Login username={this.props.username}/>
			</header>
		)
	}
}

export default Header;