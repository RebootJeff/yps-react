import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';

import VideoPlayer from '../VideoPlayer';

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
    return (<List>
      {this.props.searchResults.map(this.renderSearchResult)}
    </List>);
  }
}

function mapStateToProps({ searchResults }) {
  return { searchResults };
}

SearchResults.propTypes = {};

SearchResults.defaultProps = {};

export default connect(mapStateToProps)(SearchResults);
