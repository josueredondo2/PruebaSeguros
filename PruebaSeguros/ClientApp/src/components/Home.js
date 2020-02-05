import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { VerificaTokenValido } from '../request/LoginRequest';
import { Notification } from '../components/Util/Notification/Notification';

import { SiteRutas } from "../request/PathConfig";
export class Home extends Component {
  static displayName = Home.name;

  componentDidMount = async () =>{

    await this.ValidarToken();

  }


  ValidarToken = async () =>{
    var response = await VerificaTokenValido();
    console.log(response)
    if (response.ok) {
      return;
    }
    else {
      if (response.status === 401 ) {
        Notification.error("El token de conexión vencio.");
        this.props.history.push("/");
      }
      else {
        Notification.error('Ocurrió un error con el servidor.');
      }
    }
  }

  render() {
    return (
      <Fragment>
        <section className="titles">
          <div className="row">
            <div className="col-4">
              <h2>
                <Link to={SiteRutas.AsignaPoliza}>
                  Mantenimientos
              </Link>
              </h2>
            </div>
            <div className="col-8 text-right"></div>
          </div>
        </section>

        <section className="titles">
          <div className="row">
            <div className="col-12 m-2"></div>
            <Link to={SiteRutas.Poliza}>
            <button type="button" class="btn btn-primary btn-lg">Mantenimiento Pólizas</button>
              </Link>
            
          </div>
          <div className="row">
            <div className="col-12 m-2"></div>
            <Link to={SiteRutas.AsignaPoliza}>
            <button type="button" className="btn btn-primary btn-lg">Asignar Pólizas a Clientes</button>
              </Link>
          </div>
          <div className="row">
            <div className="col-12 m-2"></div>
            <Link to={SiteRutas.Login}>
            <button type="button" className="btn btn-primary btn-lg">Salir</button>
              </Link>
          </div>

        </section>
      </Fragment>
    );
  }
}
