import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchIcon from 'material-ui/svg-icons/action/search';

import SearchForm from '../SearchForm';
import SearchResults from '../SearchResults';

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="appContainer">
          <AppBar title="YouTube Power Search" iconElementLeft={<SearchIcon />} />
          <SearchForm />
          <SearchResults />
        </div>
      </MuiThemeProvider>
    );
  }
}
