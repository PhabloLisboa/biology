import React, {Component} from 'react'
import { withRouter } from "react-router-dom";

import api from "../../services/api";

class Home extends Component{
	state = {
		themes: []
	};

	handlethemes = async e =>{
		e.preventDefault()
		// const { themes } = this.state
		// const response = await api.get("/themes");
	}

	render(){
		return(
			<div>
				<button onClick={this.handlethemes}>Themes</button>
			</div>
		)
	}
}

export default withRouter(Home);
