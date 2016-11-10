import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchIcon from 'material-ui/svg-icons/action/search';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import SearchForm from '../SearchForm';
import SearchResults from '../SearchResults';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.handleSearchStart = this.handleSearchStart.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);

    this.state = {
      tabIndex: 0 // begin on Search Config tab
    };
  }

  handleSearchStart() {
    this.setState({ tabIndex: 1 }); // switch to Search Results tab
  }

  handleTabChange(newIndex) {
    this.setState({ tabIndex: newIndex });
  }

  render() {
    const { tabIndex } = this.state;

    return (
      <MuiThemeProvider>
        <div className="appContainer">
          <AppBar title="YouTube Power Search" iconElementLeft={<SearchIcon />} />
          <Tabs
            onChange={this.handleTabChange}
            value={tabIndex}
          >
            <Tab
              label="Search Config"
              value={0}
            />
            <Tab
              label="Search Results"
              value={1}
            />
          </Tabs>
          <SwipeableViews
            onChangeIndex={this.handleTabChange}
            index={tabIndex}
          >
            <SearchForm onSearchStart={this.handleSearchStart} />
            <SearchResults />
          </SwipeableViews>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {};
App.defaultProps = {};
