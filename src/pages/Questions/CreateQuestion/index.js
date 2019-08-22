import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { getUser } from './../../../services/auth'

import NavbarAdmin from './../../../common/navbarAdmin'
import Select from './../../../common/select'
import Quill from './../../../common/quill'
import {Row, Col} from 'react-materialize'

import api from './../../../services/api'


import { Style } from './styles'
import './script'





class CreateQuestion extends Component {
	constructor(props) {
		super(props)
	}

	state = {
		title: '',
		content: '',
		themeId: '',
		postId: '',
		type: 0,

	}

	componentWillMount() {
		try {
			getUser.then(resp => {
				if (resp.data.user.userType !== 1) {
					this.props.history.push("/home")
					return
				}
			})
		} catch{
			this.props.history.push("/home")
			return
		}
	}

	getThemes() {
		return api.get('/themes')
	}

	handleType(value){
		this.setState({type: value})
	}


	Create() {
		const { title, content, themeId, postId, type } = this.state

	}


	render() {

		const Alternative = () =>(
			<div className="row">
				<div className="input-field col s6 offset-s3">
				<input id="alternative" type="text" className="validate" />
				<label htmlFor="alternative">Alternativa</label>
				</div>
			</div>
		)
		const DivType = () =>{
			if(this.state.type == 1){
				let i = 0
				return (
					<div>
						<div className="row">
							<div className="center-align" style={{marginTop:'5%'}}>
								<a 
									className="btn-floating btn-medium waves-effect waves-light"
									onClick={()=> {
										i++
										for(let c = 0; c <= i; c++){
										return	(<Alternative/>)
										}
									}}>
									<i className="material-icons">add</i>
								</a>
							</div>							
						</div>
						<div className="row" id="alternatives">						
						</div>     					
					</div>
				)
			}
			return null
		}
		return (
			<div>
				<NavbarAdmin name='Phablo' />
				<div className="container">
					<h4 className="center-align" style={Style.h2}>Criando Questão:</h4>

					<form>

						<div className="row">
							<div className="col s12">

								<div className="row">
									<div className="input-field col s6 offset-s3">
										<input id="title" type="text" className="validate" />
										<label htmlFor="title">Título</label>
									</div>
								</div>

								<div className="row">
									<Select label={"Tema"} s={5} fetchdata={this.getThemes} />
								



									<div className="col s6 offset-s1">
										<div className="row">
											<label>Tipo da Questão</label>
										</div>
										<div className="row">
											<label>
												<input className="with-gap" 
													   name="type" 
													   type="radio"  
													   value="1"
													   onChange={e => (this.handleType(e.target.value))}/>
												<span>Multipla Escolha</span>
											</label>
											<label>
												<input className="with-gap" 
													   name="type" 
													   type="radio"  
													   value="2"
													   onChange={e => (this.handleType(e.target.value))}/>
												<span>Discursiva</span>
											</label>
											<label>
												<input className="with-gap" 
													   name="type" 
													   type="radio"  
													   value="3"
													   onChange={e => (this.handleType(e.target.value))}/>
												<span>Complementação</span>
											</label>
										</div>
									</div>
								</div>

							</div>
						</div>
						<input type="text" hidden></input>
						<label>Conteúdo</label>
						<Quill></Quill>
						<DivType />
						
		
					</form>

				</div>
			</div>

		)
	}

}
export default CreateQuestion