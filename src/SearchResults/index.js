import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui/Stepper';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import Visibility from 'material-ui/svg-icons/action/visibility';
import { deepPurple800 } from 'material-ui/styles/colors';
import moment from 'moment';

import styles from './styles.js';
// import styles from './test.css';

import {
  fetchSearchResults,
  requestSearchResults
} from '../SearchForm/actions.js';
import VideoPlayer from '../VideoPlayer';
import { commafyStringNumber } from '../utils';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.handleListItemClick = this.handleListItemClick.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.renderInstructions = this.renderInstructions.bind(this);
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

  renderInstructions() {
    return (
      <Stepper
        activeStep={0}
        orientation="vertical"
        style={styles.stepper}
      >
        <Step>
          <StepLabel>Perform a search</StepLabel>
        </Step>
        <Step>
          <StepLabel>Browse search results</StepLabel>
        </Step>
        <Step>
          <StepLabel>Open a search result to play video</StepLabel>
        </Step>
      </Stepper>
    );
  }

  renderLoadMoreButton(isLoading) {
    if(isLoading) {
      return null;
    }

    return (<div style={styles.loadMoreButtonContainer}>
      <RaisedButton
        label="Load More"
        onTouchTap={this.loadMore}
        primary
      />
    </div>);
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
    const duration = moment.duration(contentDetails.duration);

    return (
      <ListItem
        key={id}
        nestedItems={[nestedPlayer]}
        open={openListItem === id}
        onClick={(e) => this.handleListItemClick(e, id)}
      >
        <div style={styles.searchResultContainer}>
          <img src={snippet.thumbnails.default.url} style={styles.thumbnail} />
          <ul style={styles.searchResultDetails}>
            <li style={styles.videoTitle}>{snippet.title}</li>
            <li style={styles.videoChannel}>{snippet.channelTitle}</li>
            <li style={styles.videoChannel}>{moment(snippet.publishedAt).format('YYYY-M-D h:mm a')}</li>
            <li style={styles.videoChannel}>{`${duration.hours()}:${duration.minutes()}:${duration.seconds()}`}</li>
          </ul>
        </div>
        <ul style={styles.statsContainer}>
          <li style={styles.statsItem}><Visibility style={styles.statsIcon} color={deepPurple800} /> {commafyStringNumber(statistics.viewCount)}</li>
          <li style={styles.statsItem}><ThumbUp style={styles.statsIcon} color={deepPurple800} /> {commafyStringNumber(statistics.likeCount)}</li>
          <li style={styles.statsItem}><ThumbDown style={styles.statsIcon} color={deepPurple800} /> {commafyStringNumber(statistics.dislikeCount)}</li>
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

    if(!isLoading && searchResults.items.length === 0) {
      return this.renderInstructions();
    }

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
