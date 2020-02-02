import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import { SiteRutas } from "../../request/PathConfig";
// import { ObtenerListaNaucaRequest, EliminarNaucaRequest, ObtenerListaNaucaFiltradosRequest} from '../../request/NaucaRequest';
// import { Notification } from '../../components/Util/Notification/Notification';
// import Mensaje from '../../components/Util/Notification/Mensajes';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";

export class PolizaPage extends Component {
  state = {
    selectedPoliza: null,
    loading: false,
    registros: []
  };
  // filtrarRegistro = this.filtrarRegistro.bind(this);

  componentDidMount() {
    // this.cargarRegistros();
  }

  // async cargarRegistros() {
  //     this.setState({ loading: true });

  //     const response = await ObtenerListaNaucaRequest(this.props.usuario.token);
  //     if (response.exitoso) {
  //         this.setState({
  //             loading: false,
  //             registros: response.objeto || []
  //         });
  //     }
  //     else {
  //         Notification.error(response.mensajeRespuesta);
  //     }
  // }

  //  async filtrarRegistro(event) {

  //     if (event.key !== 'Enter') return;

  //     this.setState({
  //         loading: true
  //     });

  //     var filtro =
  //     {
  //         Nombre: event.target.value,
  //         Id_String: event.target.value,
  //         TipoFiltro: 3
  //     }

  //     const response = await ObtenerListaNaucaFiltradosRequest(this.props.usuario.token, filtro);
  //     if (response.exitoso) {
  //         this.setState({
  //             loading: false,
  //             registros: response.objeto || []
  //         });
  //     }
  //     else {
  //         Notification.error(response.mensajeRespuesta);
  //     }
  // }

  // async eliminarRegistro(pRegistro) {
  //     const resultado = await Mensaje.confirmacion('Confirmación', `¿ Está seguro que desea eliminar el registro con código ${pRegistro.nauca_Id}?`, 'Eliminar');
  //     if (resultado) {
  //         const response = await EliminarNaucaRequest(this.props.usuario.token, pRegistro.nauca_Id);
  //         if (response.exitoso) {
  //             const indiceRegistro = this.state.registros.findIndex(item => item.nauca_Id === pRegistro.nauca_Id);
  //             if (indiceRegistro > -1) {
  //                 let registros = [...this.state.registros];
  //                 registros.splice(indiceRegistro, 1);
  //                 this.setState({ registros });
  //             }

  //             Notification.success(response.mensajeRespuesta);
  //         }
  //         else {
  //             Notification.error('Ocurrio un error al intentar eliminar el registro.');
  //         }
  //     }
  // }

  // onClickEliminar = (event) => {
  //     const { selectedNauca } = this.state;
  //     if (selectedNauca) {
  //         this.eliminarRegistro(selectedNauca);
  //     }
  //     else {
  //         Mensaje.advertencia('Por favor, seleccione el registro que desea eliminar.');
  //     }
  // }

  // onSelectedRowNauca = (row, isSelect, rowIndex, e) => {
  //     this.setState({ selectedNauca: isSelect ? row : null });
  // }

  render() {
    const paginacionOpciones = {
      sizePerPage: 5,
      hideSizePerPage: true,
      hidePageListOnlyOnePage: true
    };

    // const MySearch = (props) => {
    //     let input;
    //     const handleChange = () => {
    //         props.onSearch(input.value);
    //     };
    //     return (
    //         <input className="search2" ref={n => input = n} onKeyDown={this.filtrarRegistro} style={{color:'black'}} name='filtro' onChange={handleChange} type="search" placeholder="Buscar" />
    //     );
    // };

    const products = [{ id: 1, text: "Hola" }];
    const columns = [
      {
        dataField: "id",
        text: "Product ID"
      },
      {
        dataField: "name",
        text: "Product Name"
      },
      {
        dataField: "price",
        text: "Product Price"
      }
    ];

    const selectRow = {
      mode: "radio",
      clickToSelect: true,
      hideSelectColumn: true,
      bgColor: "rgba(0,0,0,.075)"
      // ,onSelect: this.onSelectedRowNauca
    };

    // const rowEvents = {
    //     onDoubleClick: (e, row, rowIndex) => {
    //         this.props.history.push({
    //             pathname: SiteRutas.NaucaEditor,
    //             state: { nauca: row }
    //         });
    //     }
    // }

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
              <button
                className="btn info"
                // onClick={this.onClickEliminar}
              >
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
                keyField="id"
                data={products}
                columns={columns}
                striped={true}
                hover={true}
                className={
                  "table table-striped table-hover table-bordered mt-5"
                }
                noDataIndication="No se encontraron registros."
                bootstrap4
              />
              {/* <BootstrapTable
                // selectRow={selectRow}
                // rowEvents={rowEvents}
                // pagination={paginationFactory(paginacionOpciones)}
                noDataIndication="No se encontraron registros."
                bootstrap4
                striped={true}
                hover={true}
                key='id'
                data={data}
                className={
                  "table table-striped table-hover table-bordered mt-5"
                }
              /> */}
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
