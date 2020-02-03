import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import { SiteRutas } from "../../request/PathConfig";
import { GetPolizas, EliminarPoliza } from "../../request/PolizaRequest";
 import { Notification } from '../../components/Util/Notification/Notification';
import Mensaje from "../../components/Util/Notification/Mensajes";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";

export class PolizaPage extends Component {
  state = {
    selectedPoliza: null,
    loading: false,
    registros: []
  };

  componentDidMount() {
    this.CargarRegistros();
  }

  async CargarRegistros() {
    this.setState({ loading: true });

    const response = await GetPolizas();
    if (response.ok) {
      response.json().then(data => {
        if (data.correcto === true) {
          this.setState({
            loading: false,
            registros: data.dato
          });
        } else {
          Notification.error(data.dato);
        }
      });
    } else {
      if (response.status === 401) {
        Notification.error("El token de conexión vencio.");
        this.props.history.push("/");
        return;
      }
      Notification.error("Error interno.");
    }
   
  }


  async EliminarRegistro(pRegistro) {
    const resultado = await Mensaje.confirmacion(
      "Confirmación",
      `¿ Está seguro que desea eliminar el registro con código ${pRegistro.idPoliza}?`,
      "Eliminar"
    );
    if (resultado) {
      const response = await EliminarPoliza(pRegistro.idPoliza);
      if (response.ok) {
        response.json().then(data => {
          if (data.correcto === true) {
            const indiceRegistro = this.state.registros.findIndex(
              item => item.idPoliza === pRegistro.idPoliza
            );
            if (indiceRegistro > -1) {
              let registros = [...this.state.registros];
              registros.splice(indiceRegistro, 1);
              this.setState({ registros });
            }
            Notification.success("Eliminado Correctamente");
          } else {
            Notification.error(data.dato);
          }
        });
      } else {
        if (response.status === 401) {
          Notification.error("El token de conexión vencio.");
          this.props.history.push("/");
          return;
        }
        Notification.error("Error interno.");
      }
    }
  }

  onClickEliminar = () => {
    const { selectedPoliza } = this.state;
    if (selectedPoliza) {
      this.EliminarRegistro(selectedPoliza);
    } else {
      Mensaje.advertencia(
        "Por favor, seleccione el registro que desea eliminar."
      );
    }
  };

  onSelectedRow = (row, isSelect, rowIndex, e) => {
    this.setState({ selectedPoliza: row});
  };

  render() {


    const columns = [
      {
        dataField: "idPoliza",
        text: "Id"
      },
      {
        dataField: "nombre",
        text: "Nombre"
      },
      {
        dataField: "descripcion",
        text: "Descripción"
      },
      {
        dataField: "periodoCoberturaMeses",
        text: "Meses Cobertura"
      },
      {
        dataField: "precioPoliza",
        text: "Precio"
      }
    ];

    const selectRow = {
      mode: "radio",
      clickToSelect: true,
      hideSelectColumn: true,
      bgColor: "rgba(0,0,0,.075)",
      onSelect: this.onSelectedRow
    };

    const rowEvents = {
      onDoubleClick: (e, row, rowIndex) => {
        this.props.history.push({
          pathname: SiteRutas.PolizaEditor,
          state: { poliza: row }
        });
      }
    };

    return (
      <Fragment>
        <section className="titles">
          <div className="row">
            <div className="col-4">
              <h2>
                {this.state.loading ? (
                  <React.Fragment>
                    Cargando Información... <FontAwesomeIcon icon={faSpinner} />
                  </React.Fragment>
                ) : (
                  "Pólizas"
                )}
              </h2>
            </div>
            <div className="col-8 text-right">
              <button className="btn info" onClick={this.onClickEliminar}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <Link className="btn success" to={SiteRutas.PolizaEditor}>
                Nueva Póliza
              </Link>
              
            </div>
          </div>
        </section>

        <section className="main">
          <div className="row">
            <div className="col">
              <BootstrapTable
                keyField="idPoliza"
                data={this.state.registros}
                columns={columns}
                striped={true}
                hover={true}
                selectRow={selectRow}
                rowEvents={rowEvents}
                className={
                  "table table-striped table-hover table-bordered mt-5"
                }
                noDataIndication="No se encontraron registros."
                bootstrap4
              />
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
