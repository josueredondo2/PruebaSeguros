import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import { SiteRutas } from "../../request/PathConfig";
// import { GetPolizas, EliminarPoliza } from "../../request/PolizaRequest";
import { GetClientes } from "../../request/ClienteRequest";
import { Notification } from "../../components/Util/Notification/Notification";
import Mensaje from "../../components/Util/Notification/Mensajes";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const { SearchBar } = Search;

export class AsignaPage extends Component {
  state = {
    selectedCliente: null,
    loading: false,
    registros: []
  };

  componentDidMount() {
    this.CargarRegistros();
  }

  async CargarRegistros() {
    this.setState({ loading: true });

    const response = await GetClientes();
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

     AsignarPoliza   = async (pRegistro)=> {
      const resultado = await Mensaje.confirmacion(
        "Confirmación",
        `¿ Está seguro que desea asignar una poliza al código ${pRegistro.clienteCedula}?`,
        "Asignar Poliza"
      );
      if (resultado) {
        this.props.history.push({
            pathname: SiteRutas.AsignaPolizaEditor,
            state: { cliente: pRegistro }
          });
      }
    }

    onClickAsignar = () => {
      const { selectedCliente } = this.state;
      if (selectedCliente) {
        this.AsignarPoliza(selectedCliente);
      } else {
        Mensaje.advertencia(
          "Por favor, seleccione el registro que desea eliminar."
        );
      }
    };

  onSelectedRow = (row, isSelect, rowIndex, e) => {
    this.setState({ selectedCliente: row });
  };

  render() {
    const columns = [
      {
        dataField: "clienteCedula",
        text: "Id"
      },
      {
        dataField: "clienteNombre",
        text: "Nombre"
      },
      {
        dataField: "clienteApellido",
        text: "Apellido"
      },
      {
        dataField: "clienteEmail",
        text: "Email"
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
        this.onSelectedRow(row)
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
                  "Asignar Pólizas a Clientes"
                )}
              </h2>
            </div>
            <div className="col-8 text-right">
              <button
                className="btn info"
                  onClick={this.onClickAsignar}
              >
                Asignar Póliza a Cliente
              </button>
            </div>
          </div>
        </section>

        <section className="main">
          <div className="row">
            <div className="col">
              <ToolkitProvider
                keyField="clienteCedula"
                data={this.state.registros}
                columns={columns}
                search
              >
                {props => (
                  <div>
                    <SearchBar {...props.searchProps} placeholder={"Buscar Cliente"} />

                    <BootstrapTable
                      {...props.baseProps}
                      striped={true}
                      hover={true}
                      selectRow={selectRow}
                      rowEvents={rowEvents}
                      className={
                        "table table-striped table-hover table-bordered mt-5"
                      }
                      noDataIndication="No se encontraron registros."
                      bootstrap4
                      pagination={paginationFactory()}
                    />
                  </div>
                )}
              </ToolkitProvider>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
