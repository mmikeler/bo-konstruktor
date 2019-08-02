import React, {Component} from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
var $ = require('jquery')

axios.defaults.baseURL = 'https://be-original.ru';

class Domen_options extends Component {

	state = {
		active_tab: 'tab_1',
		decorsCollection: '',
		has_new_options: 0,
		// form
		form_decor_on_change: '',
		form_main_text_change: 'Поздравьте ваших клиентов с праздником или предложите скидку. Любой текст может быть <a href="#1">ссылкой</a>.',
		// decor options
		domen_options: {
			banner: {
				state: 1,
				style: 'bdemo',
				mobile_off: 1,
				fixed: 1,
				animation: 0,
			},
			popup: {
				state: 1,
				style: 'pdemo',
				mobile_off: 1,
				fixed: 1,
				animation: 0,
			},
			side: {
				state: 1,
				style: 'sdemo',
				mobile_off: 1,
				fixed: 1,
				animation: 0,
			},
			angle: {
				state: 1,
				style: 'ademo',
				mobile_off: 1,
				fixed: 1,
				animation: 0,
			}
		}
	}



	toggleTabs = (e) => {
		e.preventDefault();

		var toTarget = e.target.getAttribute('target');
		this.setState({ active_tab: toTarget })
	}

	loadData = () => {
		axios.post(`${axios.defaults.baseURL}/api/orders.php`, 1)
		.then(res => {
			const data = res.data;
			const decorsCollection = {
				'banner': [],
				'popup': [],
				'side': [],
				'angle': []
			}
			
			Object.keys(data).map(decor => (
				decor[0] === 'b' ? decorsCollection['banner'].push(data[decor]) : ''
			))
			Object.keys(data).map(decor => (
				decor[0] === 'p' ? decorsCollection['popup'].push(data[decor]) : ''
			))
			Object.keys(data).map(decor => (
				decor[0] === 's' ? decorsCollection['side'].push(data[decor]) : ''
			))
			Object.keys(data).map(decor => (
				decor[0] === 'a' ? decorsCollection['angle'].push(data[decor]) : ''
			))
			
			this.setState({ decorsCollection: decorsCollection })
		})
	}

	updateStyle = (e) => {
		var key = e.target.parentElement.getAttribute('decor_key')
		var type = e.target.parentElement.getAttribute('decor_type')

		this.setState((previousState) => {
			previousState.domen_options[type].style = key
			previousState.has_new_options = 1;
			return previousState;
		})
	}

	componentWillMount(){
		this.loadData();
	}

	decorStyle = (type) => {
		const decors = this.state.decorsCollection ? this.state.decorsCollection[type] : ''
		const list = decors ? Object.keys(decors).map(decor => (
			<label className="style__item"
				key={decor}
				decor_key={decors[decor].sku}
				decor_type={type}
				onClick={this.updateStyle}
				is_change={ this.state.domen_options[type].style === decors[decor].sku ? 1 : 0 }>
				<input className="hidden" type="radio" name={type} value={decors[decor].sku}  />
				<img className="decor-img" src={decors[decor].image} alt={decors[decor].title}  />
				<div className="style-meta">
					<span className="fs14">{decors[decor].title}</span>
					<span className="under-title">art: {decors[decor].sku}</span>
				</div>
			</label>
		)) : false
		return(
			list ?
				<fieldset className="w100p flex flex-wrap justify-start half">
					<legend>Оформление</legend>
					{list}
				</fieldset>
			: 'Нет декоров'
		)
	}

	checkbox_on_click = (e) => {
		$(e.target).toggleClass('checked');
		this.setState({has_new_options: 1});
	}

	form_decor_on_change = (e) => { this.setState({ form_decor_on_change: e.target.value }) }
	handleEditorChange = (e) => { this.setState({ form_main_text_change: e.target.getContent(), has_new_options: 1 })}
	form_mobile_off_change = (e) => { this.setState({ form_mobile_off_change: e.target.value }) }
	form_is_fixed_change = (e) => { this.setState({ form_is_fixed_change: e.target.value }) }

	// form submit
	form_submit = (e) => {
		var domen = e.target.getAttribute('domen');
		var user = e.target.getAttribute('user');
		var type = e.target.getAttribute('type');
		var new_options = {}
		new_options[domen] = this.state.domen_options;
		new_options[domen][type].main_text = this.state.form_main_text_change;
		new_options[domen].user = user;
		console.log(JSON.stringify(new_options))
		this.setState({has_new_options: 0});
	}

	submit = (type) => {
		return(
			<fieldset><legend>Сохранить настройки</legend>
				<div className="btn btn--form-submit mx-a" type={type} domen={this.props.domenChange} user={this.props.user} has_new_options={this.state.has_new_options === 1 ? 'yes' : 'no'} onClick={this.form_submit}>Сохранить</div>
			</fieldset>
		)
	}

	render(props){
		const decor_on = <div className="field flex">
							<label className="checkbox-styler" onClick={this.checkbox_on_click}>
								<input name="decor_on" className="checkbox" type="checkbox" value={this.state.form_decor_on_change} onChange={this.form_decor_on_change} />
							</label>
							<div className="field__info">
								<span className="field__title">Активация</span><br/>
								<span className="field__subtitle">Включен, если отмечено.</span>
						 	</div>
						 </div>
		
		const main_text = <fieldset><legend>Ваш текст</legend>
							<Editor
								apiKey="pycktby79cvcnlqyt8n6ni17ffx37cw2a18es4yic8qwu94e"
					        	initialValue={this.state.form_main_text_change}
					        	init={{
					        		plugins: 'link',
					        		menubar: '',
					        		toolbar: 'formatselect | bold italic | alignleft aligncenter alignright | link | forecolor |'
					        		// fontsizeselect
					        	}}
					        	language="ru_RU"
					        	onChange={this.handleEditorChange}
					    	/>
					      </fieldset>
		
		const mobile_off = <div className="field flex">
							<label className="checkbox-styler" onClick={this.checkbox_on_click}>
								<input nme="mobile_off" className="checkbox" type="checkbox" value={this.state.form_mobile_off_change} onChange={this.form_mobile_off_change} />
							</label>
							<div className="field__info">
								<span className="field__title">Отключить на мобильных устройствах</span><br/>
								<span className="field__subtitle">Разрешение экрана устройства менее 1025px. Это большинство планшетов и телефоны.</span>
						   	</div>
						   </div>
		
		const is_fixed = <div className="field flex">
							<label className="checkbox-styler" onClick={this.checkbox_on_click}>
								<input name="is_fixed" className="checkbox" type="checkbox" value="1" onChange={this.form_is_fixed_change} />
							</label>
							<div className="field__info">
								<span className="field__title">Зафиксировать положение</span><br/>
								<span className="field__subtitle">Декор закреплён и не перемещается при прокрутке. Настройка игнорируется для мобильных устройств, разрешение экрана которых менее 1025px.<br/>Это большинство планшетов и телефоны.</span>
						 	</div>
						 </div>
		
		return(
			<div className="widget">
				<div className="widget__title flex">Настройки для: {this.props.domenChange}</div>
				<div className="widget__content">
					<div className="tabs">
						<div className="tabs__header flex">
							<div target="tab_1" onClick={this.toggleTabs} className="tabs__header-item pointer" active-tab={this.state.active_tab === 'tab_1' ? 'active' : ''}>Баннер</div>
							<div target="tab_2" onClick={this.toggleTabs} className="tabs__header-item pointer" active-tab={this.state.active_tab === 'tab_2' ? 'active' : ''}>Попап</div>
							<div target="tab_3" onClick={this.toggleTabs} className="tabs__header-item pointer" active-tab={this.state.active_tab === 'tab_3' ? 'active' : ''}>Боковой</div>
							<div target="tab_4" className="tabs__header-item disabled" active-tab={this.state.active_tab === 'tab_4' ? 'active' : ''}>Угловой</div>
						</div>
						<div className="tabs__content">
							<div id="tab_1" className="tab-item" active-tab={this.state.active_tab === 'tab_1' ? 'active' : ''}>
								<form className="flex align-i-normal">
									<fieldset className="flex-column-left half"><legend>Основные настройки</legend>
										{decor_on}
										{mobile_off}
										{is_fixed}
									</fieldset>
									{this.decorStyle('banner')}
									{main_text}
									{this.submit('banner')}
								</form>
							</div>
							<div id="tab_2" className="tab-item" active-tab={this.state.active_tab === 'tab_2' ? 'active' : ''}>
								<form className="flex align-i-normal">
									<fieldset className="flex-column-left half"><legend>Основные настройки</legend>
										{decor_on}
										{is_fixed}
									</fieldset>
									{this.decorStyle('popup')}
									{main_text}
									{this.submit('popup')}
								</form>
							</div>
							<div id="tab_3" className="tab-item" active-tab={this.state.active_tab === 'tab_3' ? 'active' : ''}>
								<form className="flex align-i-normal">
									<fieldset className="flex-column-left half"><legend>Основные настройки</legend>
										{decor_on}
										{mobile_off}
									</fieldset>
									{this.decorStyle('side')}
									{this.submit('side')}
								</form>
							</div>
							<div id="tab_4" className="tab-item disable" active-tab={this.state.active_tab === 'tab_4' ? 'active' : ''}>
								<form className="flex align-i-normal">
									<fieldset className="flex-column-left half"><legend>Основные настройки</legend>
										{decor_on}
										{mobile_off}
									</fieldset>
									{this.decorStyle('angle')}
									{main_text}
									{this.submit('angle')}
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Domen_options;