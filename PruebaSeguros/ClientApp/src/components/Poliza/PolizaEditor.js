import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { SiteRutas } from "../../request/PathConfig";
import { Notification } from "../Util/Notification/Notification";
import Mensaje from "../Util/Notification/Mensajes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { GetTipoPolizas } from "../../request/TipoPolizaRequest";
import { GetTipoRiesgo } from "../../request/TipoRiesgoRequest";
import { InsertarPoliza } from "../../request/PolizaRequest";
import { parse } from "@fortawesome/fontawesome-svg-core";

export class PolizaEditorPage extends Component {
  state = {
    esNuevo: true,
    IdPoliza: 0,
    Nombre: "",
    Descripcion: "",
    PeriodoCoberturaMeses: 0,
    PrecioPoliza: 0,
    TipoRiesgo: 0,
    TipoPoliza: 0,
    lstRiesgo: [],
    lstTipoPoliza: [],
    selectedRiesgo: 0,
    selectedTipoPoliza: 0
  };

  componentDidMount() {
    this.SetearPropiedades();
    this.CargarTipoPolizas();
    this.CargarTipoRiesgos();
  }

  SetearPropiedades = () => {
    let poliza = this.props.location.state.poliza;
console.log(poliza)
    if (poliza !== undefined) {
      this.setState({
        IdPoliza: poliza.idPoliza,
        Nombre: poliza.nombre,
        Descripcion: poliza.descripcion,
        PeriodoCoberturaMeses: poliza.periodoCoberturaMeses,
        PrecioPoliza: poliza.precioPoliza,
        TipoRiesgo: poliza.tipoRiesgo,
        TipoPoliza: poliza.tipoPoliza,
        esNuevo: false
      });
    }
  };
  async CargarTipoPolizas() {
    this.setState({ loading: true });

    const response = await GetTipoPolizas();
    if (response.ok) {
      response.json().then(data => {
        let lstTipoPolizas = data.map(function(obj) {
          return {
            value: obj.idTipo,
            label: obj.nombre + "-" + obj.porcentajeCubrimiento + "%"
          };
        });
        this.setState({
          loading: false,
          lstTipoPoliza: lstTipoPolizas,
          selectedTipoPoliza :lstTipoPolizas.find(element => element.value === this.state.TipoPoliza)
        });
        
      });
    } else {
      if (response.status === 401) {
        Notification.error("El token de conexión vencio.");
        this.props.history.push("/");
      }
    }
  }

  async CargarTipoRiesgos() {
    this.setState({ loading: true });

    const response = await GetTipoRiesgo();
    if (response.ok) {
      response.json().then(data => {
        let lstTipoRiesgo = data.map(function(obj) {
          return {
            value: obj.idRiesgo,
            label: obj.nombre
          };
        });
        this.setState({
          loading: false,
          lstTipoRiesgo: lstTipoRiesgo,
          selectedTipoPoliza :lstTipoRiesgo.find(element => element.value === this.state.tipoRiesgo)
        });
      });
    } else {
      if (response.status === 401) {
        Notification.error("El token de conexión vencio.");
        this.props.history.push("/");
      }
    }
  }

  // async actualizarNauca() {
  //     let nauca = { ...this.state.nauca };
  //     if (this.validarCampos(nauca)) {

  //         nauca = this.crearObjeto(nauca);
  //         const response = await ActualizarNaucaRequest(this.props.usuario.token, nauca);
  //         if (response.exitoso) {
  //             Notification.success(response.mensajeRespuesta);
  //         }
  //         else {
  //             Notification.error(response.poliza_update.mensajeRespuesta);
  //         }
  //     }
  // }

  async InsertarPoliza() {
    if (this.validarCampos()) {
      const response = await InsertarPoliza(this.crearObjeto());
      if (response.ok) {
        response.json().then(data => {
          if (data.correcto === true) {
            Notification.success("Guardado Correctamente");
            this.props.history.push(SiteRutas.Poliza);
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

  // limpiarControles = () => {
  //     this.setState({
  //         nauca: {
  //             poliza_Id: '',
  //             poliza_Nombre: '',
  //             poliza_Advalorem: 0,
  //             poliza_Selectivo: 0,
  //             poliza_Ley6966: 0,
  //             poliza_Sobre_Tasa: 0,
  //             poliza_Ventas: 0,
  //             poliza_Otros: 0,
  //             poliza_Tarifa: 0,
  //             poliza_PedidoEspecial: false
  //         }
  //     });
  // }

  crearObjeto = () => {
    const {
      IdPoliza,
      Nombre,
      Descripcion,
      PeriodoCoberturaMeses,
      PrecioPoliza,
      selectedRiesgo,
      selectedTipoPoliza
    } = this.state;

    let Poliza = {
      IdPoliza: parseInt(IdPoliza),
      Nombre: Nombre,
      Descripcion: Descripcion,
      PeriodoCoberturaMeses: parseInt(PeriodoCoberturaMeses),
      PrecioPoliza: parseInt(PrecioPoliza),
      TipoRiesgo: selectedRiesgo.value,
      TipoPoliza: selectedTipoPoliza.value
    };

    return Poliza;
  };

  OnChangeInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // onChangeCheckBox = event => {
  //     const { name, checked } = event.currentTarget;
  //     this.setState({ nauca: { ...this.state.nauca, [name]: checked } });
  // }

  onClickGuardar = event => {
    if (this.state.esNuevo) {
      this.InsertarPoliza();
    } else {
      //   this.actualizarNauca();
    }
  };

  // calcularTarifa = () => {
  //     const porcentaje = 100;
  //     const advalorem = parsearValorFloat(this.state.nauca.poliza_Advalorem) / porcentaje;
  //     const selectivo = parsearValorFloat(this.state.nauca.poliza_Selectivo) / porcentaje;
  //     const ley = parsearValorFloat(this.state.nauca.poliza_Ley6966) / porcentaje;

  //     const montoTarifa = (advalorem * selectivo + advalorem + selectivo + ley) + 1;

  //     return montoTarifa.toFixed(decimalesPorDefecto);
  // }

  validarCampos = () => {
    const {
      Nombre,
      Descripcion,
      PeriodoCoberturaMeses,
      PrecioPoliza,
      selectedRiesgo,
      selectedTipoPoliza
    } = this.state;

    if (Nombre.trim() === "") {
      Mensaje.advertencia("Por favor ingrese un nombre para el registro");
      return false;
    }
    if (Descripcion.trim() === "") {
      Mensaje.advertencia("Por favor ingrese la descripcion para el registro");
      return false;
    }
    if (
      isNaN(PeriodoCoberturaMeses) ||
      parseFloat(PeriodoCoberturaMeses) < 0 ||
      parseFloat(PeriodoCoberturaMeses) > 2147483647
    ) {
      Mensaje.advertencia(
        "Por favor ingrese un valor valido para el periodo de meses"
      );
      return false;
    }

    if (
      isNaN(PrecioPoliza) ||
      parseFloat(PrecioPoliza) < 0 ||
      parseFloat(PrecioPoliza) > 2147483647
    ) {
      Mensaje.advertencia("Por favor ingrese un valor valido para el Precio");
      return false;
    }
    if (selectedTipoPoliza === 0) {
      Mensaje.advertencia("Por favor ingrese un valor valido tipo de poliza");
      return false;
    }
    if (selectedRiesgo === 0) {
      Mensaje.advertencia("Por favor ingrese un valor valido tipo de Riesgo");
      return false;
    }

    return true;
  };

  HandleChangeTipoPoliza = selectedOption => {
    this.setState({ selectedTipoPoliza: selectedOption });
  };

  HandleChangeTipoRiesgo = selectedOption => {
    this.setState({ selectedRiesgo: selectedOption });
  };

  render() {
    const { esNuevo } = this.state;

    return (
      <Fragment>
        <section className="titles">
          <div className="row">
            <div className="col-4">
              <h2>
                <Link to={SiteRutas.Poliza}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                  {`${esNuevo ? "Nueva" : "Editar"} Poliza`}
                </Link>
              </h2>
            </div>
          </div>
        </section>

        <section className="main form">
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label id="lblCodigo" htmlFor="txtCodigo">
                  Código
                </label>
                <input
                  type="text"
                  id="txtCodigo"
                  className="form-control"
                  aria-labelledby="lblCodigo"
                  placeholder=""
                  name="poliza_Id"
                  onChange={this.OnChangeInput}
                  value={this.state.IdPoliza}
                  disabled
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label id="lblNombre" htmlFor="txtNombre">
                  Nombre
                </label>
                <input
                  type="text"
                  id="txtNombre"
                  className="form-control"
                  aria-labelledby="lblNombre"
                  placeholder=""
                  name="Nombre"
                  onChange={this.OnChangeInput}
                  value={this.state.Nombre}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label id="lblDescripcion" htmlFor="txtDescripcion">
                  Descripción
                </label>
                <input
                  type="text"
                  id="txtDescripcion"
                  className="form-control"
                  aria-labelledby="lblDescripcion"
                  placeholder=""
                  name="Descripcion"
                  onChange={this.OnChangeInput}
                  value={this.state.Descripcion}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label id="lblPeriodoCobertura" htmlFor="txtPeriodoCobertura">
                  Periodo de Cobertura en Meses
                </label>
                <input
                  type="number"
                  id="txtPeriodoCobertura"
                  className="form-control"
                  aria-labelledby="lblPeriodoCobertura"
                  placeholder="0.00%"
                  name="PeriodoCoberturaMeses"
                  step="1"
                  maxLength={3}
                  onChange={this.OnChangeInput}
                  value={this.state.PeriodoCoberturaMeses}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label id="lblPrecioPoliza" htmlFor="txtPrecioPoliza">
                  Precio de Poliza
                </label>
                <input
                  type="number"
                  id="txtPrecioPoliza"
                  className="form-control"
                  aria-labelledby="lblPrecioPoliza"
                  placeholder="0.00"
                  name="PrecioPoliza"
                  step="0.01"
                  maxLength={3}
                  onChange={this.OnChangeInput}
                  value={this.state.PrecioPoliza}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label id="lblTipoPoliza">Tipo Poliza</label>
                <Select
                  value={this.state.selectedTipoPoliza}
                  onChange={this.HandleChangeTipoPoliza}
                  options={this.state.lstTipoPoliza}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label id="lblRiesgo">Tipo Riesgo</label>
                <Select
                  value={this.state.selectedRiesgo}
                  onChange={this.HandleChangeTipoRiesgo}
                  options={this.state.lstTipoRiesgo}
                />
              </div>
            </div>
          </div>

          <div className="row justify-content-end mt-3 text-right">
            <div className="col-md-4 mb-3">
              <Link className="btn btn-secondary mr-2" to={SiteRutas.Poliza}>
                Cancelar
              </Link>
              <button className="btn success" onClick={this.onClickGuardar}>
                Guardar
              </button>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
