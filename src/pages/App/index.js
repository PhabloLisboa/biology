import React, {Component} from 'react'
import { Link, withRouter, Redirect } from "react-router-dom";

import NavbarAdmin from './../../common/navbarAdmin'
import { getUser } from './../../services/auth'

class App extends Component{
	state = {}

	componentWillMount(){
		getUser.then(resp => {
			if(resp.data.user.userType !== 1){
				this.props.history.push("/home")
				return
			}
		})
	}

	render(){
		return(
			<div>
				<NavbarAdmin name={'Marcelo'}/>

				<div className='container'>
					<h1>App</h1>
				</div>				
			</div>
		)
	}
}

export default withRouter(App);
