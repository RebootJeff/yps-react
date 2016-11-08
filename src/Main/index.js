import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchIcon from 'material-ui/svg-icons/action/search';

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <AppBar title="YouTube Power Search" iconElementLeft={<SearchIcon />} />
      </MuiThemeProvider>
    );
  }
}
