import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import { SiteRutas } from "../../request/PathConfig";
// import { GetPolizas, EliminarPoliza } from "../../request/PolizaRequest";
import { GetPolizasXClientes,InsertarPolizaXCliente,EliminarPolizaXCliente } from "../../request/PolizaXCliente";
import { Notification } from "../../components/Util/Notification/Notification";
import Mensaje from "../../components/Util/Notification/Mensajes";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const { SearchBar } = Search;

export class AsignaEditorPage extends Component {
  state = {
    selectedClientePoliza: null,
    selectedPolizaNueva: null,
    loading: false,
    registros: [],
    clienteCedula:0
  };

  componentDidMount() {
    this.SetearPropiedades();
  }
  SetearPropiedades =async () => {
      console.log('this.props.location.state',this.props.location.state.cliente)
    if (this.props.location.state !== undefined) {
      let cliente = this.props.location.state.cliente;
      console.log('cliente',cliente)
      if (cliente !== undefined) {
        await this.setState({
            clienteCedula: cliente.clienteCedula,
        //   Nombre: cliente.nombre,
        //   Descripcion: cliente.descripcion,
        //   PeriodoCoberturaMeses: cliente.periodoCoberturaMeses,
        //   Preciocliente: cliente.preciocliente,
        //   selectedTipoRiesgo: cliente.tipoRiesgo,
        //   Tipocliente: cliente.tipocliente,
        //   esNuevo: false
        });
        this.CargarRegistros();

      }
    }
  };
  async CargarRegistros() {
    this.setState({ loading: true });
console.log(this.state.clienteCedula);
    const response = await GetPolizasXClientes(this.state.clienteCedula);
    if (response.ok) {
      response.json().then(data => {
        if (data.correcto === true) {
          this.setState({
            loading: false,
            registros: data.dato
          });
          console.log(data.dato)
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

    async AsignarPoliza(pRegistro) {
        console.log(pRegistro);
      const resultado = await Mensaje.confirmacion(
        "Confirmación",
        `¿ Está seguro que desea asignar una poliza al código ${pRegistro.idPoliza}?`,
        "Asignar Poliza"
      );
      if (resultado) {
        this.props.history.push({
            pathname: SiteRutas.AsignaEditor,
            state: { clienteCedula: pRegistro }
          });
      }
    }

    async InsertarPolizaXCliete() {
        const response = await InsertarPolizaXCliente(this.crearObjeto());
        if (response.ok) {
          response.json().then(data => {
            if (data.correcto === true) {
              Notification.success("Guardado Correctamente");
              this.CargarRegistros();
              // this.props.history.push(SiteRutas.Poliza);
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

    async EliminarPolizaXCliente(pRegistro) {
      const resultado = await Mensaje.confirmacion(
        "Confirmación",
        `¿ Está seguro que desea eliminar el registro con código ${pRegistro.idPoliza}?`,
        "Eliminar"
      );
      if (resultado) {
        const response = await EliminarPolizaXCliente(this.state.clienteCedula,pRegistro.id);
        if (response.ok) {
          response.json().then(data => {
            if (data.correcto === true) {
            //   const indiceRegistro = this.state.registros.findIndex(
            //     item => item.idPoliza === pRegistro.idPoliza
            //   );
            //   if (indiceRegistro > -1) {
            //     let registros = [...this.state.registros];
            //     registros.splice(indiceRegistro, 1);
            //     this.setState({ registros });
            //   }
              Notification.success("Eliminado Correctamente");
              this.CargarRegistros();
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

    CrearObjeto = () => {
return {};

    }

    onClickAsignar = () => {
      const { selectedCliente } = this.state;
      if (selectedCliente) {
        // this.AsignarPoliza(selectedCliente);
      } else {
        Mensaje.advertencia(
          "Por favor, seleccione el registro que desea eliminar."
        );
      }
    };

  onSelectedRow = (row, isSelect, rowIndex, e) => {
    this.setState({ selectedCliente: isSelect ? row : null });
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
        this.props.history.push({
          pathname: SiteRutas.AsignaEditor,
          state: { clienteCedula: row.clienteCedula }
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
                  "Pólizas del cliente"
                )}
              </h2>
            </div>
            <div className="col-8 text-right">
            </div>
          </div>
        </section>

        <section className="main">
          <div className="row">
            <div className="col-6">
            <button
                className="btn info"
                  onClick={this.onClickAsignar}
              >
                Eliminar Póliza a Cliente
              </button>
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
            <div className="col-6">
            <button
                className="btn info"
                  onClick={this.onClickAsignar}
              >
                Asignar Póliza a Cliente
              </button>
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
