import React, {Component} from 'react'
import { Select } from 'react-materialize'

class Selecter extends Component{
	constructor(props) {
		super(props)
	}
	state = {options:[]}

	componentWillMount() {
		this.props.fetchdata().then(resp =>{
			let aux = []
			resp.data.map(item => 
				aux.push(item.description)
			)
			this.setState({options: aux})
		})
	}
	render(){
		return(
			<Select s={this.props.s} label={this.props.label} className={this.props.className}>
				{
					this.state.options.map((item, index) =>(
						<option key={index} value={index}>{item}</option>
					))
				}
			</Select>
		)
	}
}

export default Selecter