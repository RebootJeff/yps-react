import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import {
  fetchSearchResults,
  requestSearchResults
} from '../SearchForm/actions.js';
import VideoPlayer from '../VideoPlayer';

const styles = {
  spinner: {
    display: 'inline-block',
    position: 'relative',
    margin: '1em'
  }
};

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.handleListItemClick = this.handleListItemClick.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.renderLoadMoreButton = this.renderLoadMoreButton.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
    this.renderSearchResult = this.renderSearchResult.bind(this);

    this.state = {
      openListItem: null
    };
  }

  handleListItemClick(e, id) {
    e.preventDefault();
    if(this.state.openListItem === id) {
      this.setState({ openListItem: null });
    } else {
      this.setState({ openListItem: id });
    }
  }

  loadMore() {
    const {
      fetchSearchResults,
      requestSearchResults,
      searchResults
    } = this.props;

    requestSearchResults(false);
    fetchSearchResults(searchResults.searchText, searchResults.nextPageToken);
  }

  renderLoadMoreButton(isLoading) {
    if(isLoading) {
      return null;
    }

    return (
      <RaisedButton
        label="Load More"
        onTouchTap={this.loadMore}
        primary
      />
    );
  }

  renderSearchResult(searchResult) {
    const {
      contentDetails,
      id,
      snippet,
      statistics,
      status
    } = searchResult;
    const {
      openListItem
    } = this.state;

    const nestedPlayer = <VideoPlayer key={0} videoDetails={searchResult} />;

    return (
      <ListItem
        key={id}
        nestedItems={[nestedPlayer]}
        open={openListItem === id}
        onClick={(e) => this.handleListItemClick(e, id)}
      >
        <img src={snippet.thumbnails.default.url} />
        <ul>
          <li>{snippet.title}</li>
          <li>{snippet.channelTitle}</li>
        </ul>
      </ListItem>
    );
  }

  renderSpinner(isLoading) {
    if(isLoading === false) {
      return null;
    }

    return (
      <RefreshIndicator
        top={0}
        left={0}
        status="loading"
        style={styles.spinner}/>
    );
  }

  render() {
    const {
      isLoading,
      searchResults
    } = this.props;

    return (<div>
      <List>
        {searchResults.items.map(this.renderSearchResult)}
        {this.renderLoadMoreButton(isLoading)}
        {this.renderSpinner(isLoading)}
      </List>
    </div>);
  }
}

function mapStateToProps({ isLoading, searchResults }) {
  return {
    isLoading,
    searchResults
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchSearchResults,
    requestSearchResults
  }, dispatch);
}

SearchResults.propTypes = {};
SearchResults.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
