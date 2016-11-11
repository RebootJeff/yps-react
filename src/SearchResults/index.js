import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import RefreshIndicator from 'material-ui/RefreshIndicator';

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

  render() {
    const {
      isLoading,
      searchResults
    } = this.props;

    if(isLoading) {
      return <RefreshIndicator
        top={0}
        left={0}
        status="loading"
        style={styles.spinner}/>;
    }

    return (<List>
      {searchResults.map(this.renderSearchResult)}
    </List>);
  }
}

function mapStateToProps({ isLoading, searchResults }) {
  return {
    isLoading,
    searchResults
  };
}

SearchResults.propTypes = {};

SearchResults.defaultProps = {};

export default connect(mapStateToProps)(SearchResults);
