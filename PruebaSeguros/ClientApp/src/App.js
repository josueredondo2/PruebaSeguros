import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import {LoginPage} from './components/Login/LoginPage'
import {PolizaPage} from './components/Poliza/PolizaPage'
import {PolizaEditorPage} from './components/Poliza/PolizaEditor'
import {AsignaPage} from './components/AsignaPolizaCliente/AsignaPage'
import {AsignaEditorPage} from './components/AsignaPolizaCliente/AsignaEditor'

import { SiteRutas } from "./request/PathConfig";



import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Switch>
        <Route exact path={SiteRutas.Login} component={LoginPage} />
        <Layout>
        <Route exact path={SiteRutas.Home} component={Home} />
        <Route path={SiteRutas.Poliza} component={PolizaPage} />
        <Route path={SiteRutas.PolizaEditor} component={PolizaEditorPage} />
        <Route path={SiteRutas.AsignaPoliza} component={AsignaPage} />
        <Route path={SiteRutas.AsignaPolizaEditor} component={AsignaEditorPage} />
      </Layout>
      </Switch>
    );
  }
}
