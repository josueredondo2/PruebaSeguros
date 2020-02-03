import React, { Component } from 'react';

import './LoginPage.css';
import { SiteRutas } from '../../request/PathConfig';
import { Notification } from '../../components/Util/Notification/Notification';
import { LoginRequest } from '../../request/LoginRequest';

export  class LoginPage extends Component {
  state = {
    username: '',
    password: ''
  }

  async AuthenticateUser() {
    const { username, password } = this.state;
    
    if (this.ValidateInputData(username, password)) {
      console.log(username,password)

        var response = await LoginRequest(username, password);
        console.log(response)
        // response = { ...response, respuesta: response.respuesta };
      if (response.ok) {
        Notification.success("Ingreso Correcto");
        response.json().then(data => {
          this.SaveToken(data.token);
        });
        this.props.history.push(SiteRutas.Home);
      }
      else {
        if (response.status === 401 ) {
          Notification.error("Usuario o Password incorrectos");
        }
        else {
          Notification.error('Ocurrió un error con el servidor.');
        }
      }
    }
  }
  
  SaveToken =(pToken) =>
  {
    sessionStorage.setItem('token', pToken);
  }

  ValidateInputData = () => {
    const { username, password } = this.state;

    if (!username || !username.trim()) {
      Notification.error("Por favor ingrese un usuario.");
      return false;
    }

    if (!password || !password.trim()) {
      Notification.error("Por favor ingrese la contraseña.");
      return false;
    }

    return true;
  }

  // setUserData = (pUserData) => {
  //   this.props.onSetUserLoggedIn(true);
  //   this.props.onSetUser({
  //     token: pUserData.token,
  //     nombre: pUserData.usuario_Nombre
  //   });
  // }

  OnInputChanged = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  PasswordOnKeyPressed = event => {
    if (event.which === 13 || event.keyCode === 13) {
      this.AuthenticateUser();
    }
  }

  
  OnLoginHandler = event => {
    event.preventDefault();
    this.AuthenticateUser();
  }

  render() {
    const { username, password } = this.state;

    return (
      <div className="layout-container">

        <div className="login-info">
        
          <div className="row">
            <div className="col-md-12 text-center">
              <p className="title">Seguros Gap</p>
              <p className="titleGap">Iniciar Sesión</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <input name="username"
                type="text"
                className="login"
                placeholder="email"
                value={username}
                onChange={this.OnInputChanged} 

                />
              <input name="password"
                type="password"
                className="login"
                placeholder="Contraseña"
                value={password}
                onChange={this.OnInputChanged}
                onKeyPress={this.PasswordOnKeyPressed} 

                />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <button className="btn btn-iniciar" id="btn-iniciar" 
              onClick={this.OnLoginHandler}
              > Iniciar Sesión</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
