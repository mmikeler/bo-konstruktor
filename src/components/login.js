import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component {
	state = {
		user_name: false
	}

	hendleClick = (e) => {
		e.preventDefault();

		axios.post(`${axios.defaults.baseURL}/app.php`, {name: ''})
		.then(res => {
			const data = res.data;
			if(data) { 
				this.setState({ login: true })
				this.setState({ user_data: data })
				this.props.mainData(data)
			}
			else { console.log('error') } 
		})
	}

	render(props){
		//console.log(this.props);
		const login = this.props.username ? <span>Привет, {this.props.username}</span> : <span>Войти</span>;
		const reg = !this.props.username && <div className="login__reg mx10">Регистрация</div>

		return(
			<div className="login flex">
				<div className="login__enter mx10" onClick={this.hendleClick}>{login}</div>
				{reg}
			</div>
		)
	}
}

export default Login;