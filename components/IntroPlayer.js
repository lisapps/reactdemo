import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/playerActions';
import videojs from 'video.js';
import '!style-loader!css-loader!video.js/dist/video-js.css'; // eslint-disable-line

class IntroPlayer extends Component {
  componentDidMount() {
    const { onEnd } = this.props.actions;
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this); // eslint-disable-line
    });
    this.player.on('ended', function() {
      onEnd();
    });
  }

  componentWillUnmount() {
    // Destroy player
    if (this.player) {
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div data-vjs-player>
        <video ref={node => this.videoNode = node} className="video-js"/>
      </div>
    );
  }
}

IntroPlayer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(IntroPlayer);
