import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import './script'

 

 export default class NavbarAdmin extends Component{
 	state = {}

 	render(){
 		return( 			
		 /* <nav>
		    <div className="nav-wrapper teal darken-2">
		    <div className="container">
		      <a href="#" className="brand-logo">Logo</a>
		      <ul id="nav-mobile" className="right hide-on-med-and-down">
		        <li><Link to="#">Sass</Link></li>
		        <li><Link to="#">Components</Link></li>
		        <li><Link to="#">JavaScript</Link></li>
		      </ul>
		    </div>
		    </div>
		  </nav>*/
		<div>

			<ul id="slide-out" className="sidenav">
			    <li>
			    <div className="user-view">
				      <div className="background">
				        <img src="images/office.jpg"/>
				      </div>
				      <span>{this.props.name}</span>
				      <Link to="#"><img className="circle" src="images/yuna.jpg" /></Link>
				      <a href="#name"><span className="white-text name"></span></a>
				      <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
				 </div>
			    </li>
			    <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
			    <li><a href="#!">Second Link</a></li>
			    <li><div className="divider"></div></li>
			    <li><a className="subheader">Subheader</a></li>
			    <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
		  	</ul>
  		<a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>     
 	</div>	
 	)
 	}
 }