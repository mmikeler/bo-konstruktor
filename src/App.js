import React, {Component} from 'react';
import axios from 'axios';
import Header from './components/header'
import Domens from './components/domens'
import Decors from './components/decors'
import Domen_options from './components/domen-options'
import './App.css';

axios.defaults.baseURL = 'https://be-original.ru';

class App extends Component {
	state = {
		islogged: '',
		user_data: '',
		options: '',
		faillogin: '',
		domenChange: '',
		// form
		login_user_name: '',
		login_pass: ''
	}

	user_name_change = (e) => { this.setState({ login_user_name: e.target.value }) }
	user_pass_change = (e) => { this.setState({ login_pass: e.target.value }) }

	onDomenChange = (value) => {
		this.setState({ domenChange: value })
	}

	loginClick = (e) => {
		e.preventDefault();

		axios.post(`${axios.defaults.baseURL}/api/options.php`, {name: 'root'})
		.then(res => {
			const data = res.data;
			if(data) { 
				this.setState({ islogged: true })
				this.setState({ user_data: data.user_data })
				this.setState({ options: data.options })
				//console.log(data)
			}
			else {
				this.setState({ faillogin: true })
				console.log('Failed connect to base.')
			}
		})
	}

	render(){
		//console.log('Login ' + this.state.islogged)
		//console.log(this.state.user_data)
		//console.log('Options '+this.state.options)
		//console.log(this.state.domenChange)
		//console.log('Fail '+ this.state.faillogin)
		const faillogin = this.state.faillogin && 'fail'
		const loginForm = 
			<div className="login-form widget w300 mx-a" state={faillogin}>
				<div className="widget__title">Войти</div>
				<div className="widget__content">
					<input className="mb10" type="text" name="login" placeholder="Login" value={this.state.login_user_name} onChange={this.user_name_change} />
					<input className="mb10" type="password" name="pass" placeholder="Pass" value={this.state.login_pass} onChange={this.user_pass_change} />
					<button onClick={this.loginClick} className="mx-a">Log In</button>
				</div>
			</div>;

		return (
    		<div className="body">
	    		<Header islogged={this.state.islogged} username={this.state.user_data.display_name} />
	    		<div className="content w100p flex">
	    			
	    				{this.state.islogged &&
	    					<div className="sidebar">
		    					<Domens
		    						domenChange={this.onDomenChange}
		    						islogged={this.state.islogged}
		    						username={this.state.user_data.user_login}
		    						options={ this.state.options ? this.state.options : false } />
		    					<Decors />
	    					</div>
	    				}
	    			
	    			<div className="bord">
	    				{ !this.state.islogged && loginForm }
	    				{ this.state.domenChange && <Domen_options domenChange={this.state.domenChange} user={this.state.user_data.ID} /> }
	    			</div>
	    		</div>
    		</div>
  		);
	}
}

export default App;
