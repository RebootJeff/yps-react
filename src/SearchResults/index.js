import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';

class SearchResults extends Component {
  renderSearchResult(searchResult) {
    const { id, snippet } = searchResult;
    return (
      <ListItem
        key={id.videoId}
        primaryText={snippet.title}
        secondaryText={id.videoId}
      />
    );
  }

  render() {
    console.log('this.props:', this.props);
    return (
      <List>
        {this.props.searchResults.map(this.renderSearchResult)}
      </List>
    );
  }
}

function mapStateToProps({ searchResults }) {
  return { searchResults };
}

export default connect(mapStateToProps)(SearchResults);
