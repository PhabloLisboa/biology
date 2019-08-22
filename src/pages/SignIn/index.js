import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css';

import api from "../../services/api";
import { login} from "../../services/auth";
import {Style} from './styles'



class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault()
    const { email, password } = this.state
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/login", { email, password });
        login(response.data.token);
          if(response.data.User.userType === 1){
            this.props.history.push("/app");
            return
          }
        this.props.history.push("/home");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T"
        });
      }
    }
  };

  render() {
    return (
      <div className='valign-wrapper' style={Style.container}>
        <div className='row'>
          <div className='col'>
            <h3>Biologia em Questões!</h3>
          </div>
        </div>
        <div className='row '>
          <form onSubmit={this.handleSignIn}
            className='col s12'
            style={Style.form}>
            {this.state.error && <p>{this.state.error}</p>}
            <div className='row'>
              <div className='input-field text-accent-3'>
                <input
                  type="email"
                  id='email'
                  className='validate'
                  onChange={e => this.setState({ email: e.target.value })}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field'>
                <input
                  type="password"
                  id='password'
                  className='validate'
                  onChange={e => this.setState({ password: e.target.value })}
                />
                <label htmlFor="password">Senha</label>
              </div>
            </div>
            <div className='row'>
              <div className='col offset-s2  offset-l4'>
                <button type="submit"
                  className='btn waves-effect waves-light'>Entrar
                  <i className="material-icons right">send</i></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);