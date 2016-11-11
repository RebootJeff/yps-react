import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {
  fetchSearchResults,
  requestSearchResults
} from './actions.js';
import styles from './styles.js';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      searchText: ''
    };
  }

  handleChange(e) {
    this.setState({ searchText: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      fetchSearchResults,
      requestSearchResults,
      onSearchStart
    } = this.props;

    onSearchStart();
    requestSearchResults(true);
    fetchSearchResults(this.state.searchText);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={styles.form}>
        <TextField
          hintText="Enter your search"
          onChange={this.handleChange}
          value={this.state.searchText}
        />
        <br />
        <RaisedButton
          label="Search"
          onTouchTap={this.handleSubmit}
          primary
        />
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchSearchResults,
    requestSearchResults
  }, dispatch);
}

SearchForm.propTypes = {
  onSearchStart: PropTypes.func
};

SearchForm.defaultProps = {};

export default connect(null, mapDispatchToProps)(SearchForm);
