import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { fetchSearchResults } from './actions.js';

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
      onSearchStart
    } = this.props;

    onSearchStart();
    fetchSearchResults(this.state.searchText);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          hintText="Enter your search"
          onChange={this.handleChange}
          value={this.state.searchText}
        />
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
  return bindActionCreators({ fetchSearchResults }, dispatch);
}

SearchForm.propTypes = {
  onSearchStart: PropTypes.func
};

SearchForm.defaultProps = {};

export default connect(null, mapDispatchToProps)(SearchForm);
