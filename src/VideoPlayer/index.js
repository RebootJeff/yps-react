import React, { Component, PropTypes } from 'react';

const EMBED_PARAMS = [
  'iv_load_policy=3', // hide video's annotations
  'autoplay=1', // begin playback immediately
  'showinfo=0', // hide video title and uploader info
  'rel=0', // hide YouTube's related videos at end of playback
  'modestbranding=1', // hide YouTube logo
  'playsinline=1', // allows inline viewing in iOS UIWebViews
].join('&');

function VideoPlayer({ videoDetails }) {
  const {
    id,
    status
  } = videoDetails;

  if(status.embeddable === false) {
    return (<p>
      Video uploader disabled embedded playback. You must visit the video URL
      &nbsp;directly here:&nbsp;
      <a href={`https://www.youtube.com/watch?v=${id}`}>Watch Video on YouTube</a>
    </p>);
  }

  return (
    <iframe
      src={`//www.youtube-nocookie.com/embed/${id}?${EMBED_PARAMS}`}
      width="380"
      height="214"
      allowFullScreen
    >
    </iframe>
  );
}

VideoPlayer.propTypes = {};
VideoPlayer.defaultProps = {};

export default VideoPlayer;
