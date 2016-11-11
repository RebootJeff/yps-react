import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import SearchIcon from 'material-ui/svg-icons/action/search';
import ViewListIcon from 'material-ui/svg-icons/action/view-list';
import SwipeableViews from 'react-swipeable-views';

import SearchForm from '../SearchForm';
import SearchResults from '../SearchResults';
import customMuiTheme from './theme.js';

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
      <MuiThemeProvider muiTheme={customMuiTheme}>
        <div className="appContainer">
          <AppBar
            title="YouTube Search"
            showMenuIconButton={false}
          />
          <Tabs
            onChange={this.handleTabChange}
            value={tabIndex}
          >
            <Tab
              icon={<SearchIcon />}
              label="Search"
              value={0}
            />
            <Tab
              icon={<ViewListIcon />}
              label="Results"
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
