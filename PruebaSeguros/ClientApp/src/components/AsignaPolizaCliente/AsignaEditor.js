import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import { SiteRutas } from "../../request/PathConfig";
import {
  GetPolizasXClientes,
  InsertarPolizaXCliente,
  EliminarPolizaXCliente
} from "../../request/PolizaXCliente";
import { GetPolizas } from "../../request/PolizaRequest";
import { Notification } from "../../components/Util/Notification/Notification";
import Mensaje from "../../components/Util/Notification/Mensajes";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, prefix } from "@fortawesome/free-solid-svg-icons";
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
    lstPolizaXCliente: [],
    lstPoliza: [],
    clienteCedula: 0
  };

  componentDidMount() {
    this.SetearPropiedades();
  }
  SetearPropiedades = async () => {
    if (this.props.location.state !== undefined) {
      let cliente = this.props.location.state.cliente;
      if (cliente !== undefined) {
        await this.setState({
          clienteCedula: cliente.clienteCedula
        });
        this.CargarRegistros();
      }
      this.CargarPolizas();
    }else{
      this.props.history.push(SiteRutas.AsignaPoliza);
    }
   
  };

  async CargarPolizas() {
    this.setState({ loading: true });

    const response = await GetPolizas();
    if (response.ok) {
      response.json().then(data => {
        if (data.correcto === true) {
          this.setState({
            loading: false,
            lstPoliza: data.dato
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

  async CargarRegistros() {
    this.setState({ loading: true });

    const response = await GetPolizasXClientes(this.state.clienteCedula);

    if (response.ok) {
      response.json().then(data => {
        if (data.correcto === true) {
          this.setState({
            loading: false,
            lstPolizaXCliente: data.dato
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

  async AsignarPoliza(pRegistro) {
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

  async InsertarPolizaXCliete(pRegistro) {

    console.log(pRegistro);

    const response = await InsertarPolizaXCliente(pRegistro);
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
      const response = await EliminarPolizaXCliente(pRegistro);
      if (response.ok) {
        response.json().then(data => {
          if (data.correcto === true) {
            Notification.success("Eliminado Correctamente");
            this.CargarRegistros();
            this.setState({ selectedClientePoliza: null });
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

  CrearObjeto = (pRegistro) => {
    const { clienteCedula } = this.state;

    let ClienteXPoliza = {
      ClienteCedula: parseInt(clienteCedula),
      IdPoliza: parseInt(pRegistro.idPoliza)
    };

    console.log(2, ClienteXPoliza);
    return ClienteXPoliza;
  };

  onClickAsignar = () => {
    const { selectedPolizaNueva } = this.state;
    if (selectedPolizaNueva) {
      var obj = this.CrearObjeto(selectedPolizaNueva)
      this.InsertarPolizaXCliete(obj);
    } else {
      Mensaje.advertencia(
        "Por favor, seleccione el registro que desea Agregar."
      );
    }
  };

  onClickEliminar = () => {
    const { selectedClientePoliza } = this.state;
    if (selectedClientePoliza) {
      this.EliminarPolizaXCliente(selectedClientePoliza);
    } else {
      Mensaje.advertencia(
        "Por favor, seleccione el registro que desea eliminar."
      );
    }
  };

  onSelectedRowCliente = (row, isSelect, rowIndex, e) => {
    this.setState({ selectedClientePoliza: row });
  };

  onSelectedRowPoliza = (row, isSelect, rowIndex, e) => {
    this.setState({ selectedPolizaNueva: row });
  };

  render() {
    const optPaginacion = {
      paginationSize: 4,
      sizePerPageList: [{
        text: '5', value: 5
    }] // A numeric array is also available. the purpose of above example is custom the text
      
  };
    const columnsLstClienteXPoliza = [
      {
        dataField: "idPolizaNavigation.idPoliza",
        text: "Id"
      },
      {
        dataField: "idPolizaNavigation.nombre",
        text: "Nombre"
      },
      {
        dataField: "idPolizaNavigation.descripcion",
        text: "Descripcion"
      },
      {
        dataField: "idPolizaNavigation.tipoPolizaNavigation.nombre",
        text: "Tipo Poliza"
      },
      {
        dataField: "idPolizaNavigation.tipoRiesgoNavigation.nombre",
        text: "Tipo Riesgo"
      }
    ];

    const columnsPolizas = [
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

    const selectRowCliente = {
      mode: "radio",
      clickToSelect: true,
      hideSelectColumn: true,
      bgColor: "rgba(0,0,0,.075)",
      onSelect: this.onSelectedRowCliente
    };

    const selectRowPoliza = {
      mode: "radio",
      clickToSelect: true,
      hideSelectColumn: true,
      bgColor: "rgba(0,0,0,.075)",
      onSelect: this.onSelectedRowPoliza
    };

    // const rowEvents = {
    //   onDoubleClick: (e, row, rowIndex) => {
    //     this.props.history.push({
    //       pathname: SiteRutas.AsignaEditor,
    //       state: { clienteCedula: row.clienteCedula }
    //     });
    //   }
    // };

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
                  <Link to={SiteRutas.AsignaPoliza}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                  {' Asignar Poliza'}
                </Link>
                )}
              </h2>
            </div>
            <div className="col-8 text-right"></div>
          </div>
        </section>

        <section className="main">
          <div className="row">
            <div className="col-12">
              <button className="btn success m-3" onClick={this.onClickEliminar}>
                Eliminar Póliza a Cliente
              </button>
              <ToolkitProvider
                keyField="idPolizaNavigation.idPoliza"
                data={this.state.lstPolizaXCliente}
                columns={columnsLstClienteXPoliza}
                search
              >
                {props => (
                  <div>
               <div className="row text-center">
                      <div className="col-8 m-3">
                    <SearchBar {...props.searchProps} placeholder={"Buscar Póliza de Cliente"} />
                    </div>
                    </div>

                    <BootstrapTable
                      {...props.baseProps}
                      striped={true}
                      hover={true}
                      selectRow={selectRowCliente}
                      className={
                        "table table-striped table-hover table-bordered mt-5"
                      }
                      noDataIndication="No se encontraron registros."
                      bootstrap4
                      pagination={paginationFactory(optPaginacion)}
                    />
                  </div>
                )}
              </ToolkitProvider>
            </div>
            <div className="col-12">
              <button className="btn success m-3" onClick={this.onClickAsignar}>
                Asignar Póliza a Cliente
              </button>
              <ToolkitProvider
                keyField="idPoliza"
                data={this.state.lstPoliza}
                columns={columnsPolizas}
                search
              >
                {props => (
                  <div>
                  <div className="row text-center">
                      <div className="col-8 m-3">
                    <SearchBar {...props.searchProps} placeholder={"Buscar Póliza"} />
                    </div>
                    </div>

                    <BootstrapTable
                      {...props.baseProps}
                      striped={true}
                      hover={true}
                      selectRow={selectRowPoliza}
                      className={
                        "table table-striped table-hover table-bordered mt-5"
                      }
                      noDataIndication="No se encontraron registros."
                      bootstrap4
                      pagination={paginationFactory(optPaginacion)}
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
