import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import {LoginPage} from './components/Login/LoginPage'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Switch>
        <Route exact path='/' component={LoginPage} />
        <Layout>
        <Route exact path='/Home' component={Home} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
      </Switch>
    );
  }
}
