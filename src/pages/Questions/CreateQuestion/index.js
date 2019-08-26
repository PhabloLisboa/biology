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
		alternatives:[],
		completes:[]

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

	handleAlternatives(value){
		let aux = this.state.alternatives
		aux.push(value)
		this.setState({alternatives: aux})
	}

	removeAlternative(index){
		let aux = this.state.alternatives
		aux.splice(index,1)
		this.setState({alternatives: aux})
	}

	handleComplementations(value){
		let aux = this.state.completes
		aux.push(value)
		this.setState({completes: aux})
		this.editor.insertComplementation(aux.length)
	}

	removeComplete(index){
		let aux = this.state.completes
		aux.splice(index,1)
		this.setState({completes: aux})
	}


	render() {

		const Alternative = () =>(
			this.state.alternatives.map((item, index) =>
				<div key={index} className="row">
					<div className="input-field col s6 offset-s3">
						<input id="alternative" type="text" className="validate" />
						<label htmlFor="alternative">Alternativa {index+1}</label>
					</div>
					<div className="center-align" style={{marginTop:'5%'}}>
						<a 
							className="btn-floating btn-medium waves-effect waves-light red"
							onClick={()=> this.removeAlternative(index)}>
							<i className="material-icons">clear</i>
						</a>
					</div>
				</div> 
			)
			
		)

		const Completes = () =>(
			this.state.completes.map((item, index) =>
				<div key={index} className="row">
					<div className="input-field col s6 offset-s3">
						<input id="complete" type="text" className="validate" />
						<label htmlFor="complete">Complementação {index+1}</label>
					</div>
					<div className="center-align" style={{marginTop:'5%'}}>
						<a 
							className="btn-floating btn-medium waves-effect waves-light red"
							onClick={()=> this.removeComplete(index)}>
							<i className="material-icons">clear</i>
						</a>
					</div>
				</div> 
			)
			
		)
		const DivType = () =>{
			if(this.state.type == 1 || this.state.type == 3){
				return (
					<div>
						<div className="row">
							<div className="center-align" style={{marginTop:'5%'}}>
								<a 
									className="btn-floating btn-medium waves-effect waves-light"
									onClick={()=> this.state.type == 1?
													this.handleAlternatives(''):
													this.handleComplementations('')}>
									<i className="material-icons">add</i>
								</a>
								<label style={{marginLeft: '2%'}}>Adicionar Alternativa</label>
							</div>							
						</div>
						{this.state.type == 1? <Alternative/>:<Completes/>} 			
											
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
						<Quill completes={this.state.completes} ref={(ref) => this.editor = ref}></Quill>
						<DivType />
						
		
					</form>

				</div>
			</div>

		)
	}

}
export default CreateQuestion