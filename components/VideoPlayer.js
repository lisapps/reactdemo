import React from 'react';
import videojs from 'video.js';
import CaptionBox from './CaptionBox';
import SvgSliderBar from './SvgSliderBar';
import '!style-loader!css-loader!video.js/dist/video-js.css'; // eslint-disable-line
import objectAssign from 'object-assign'; // eslint-disable-line

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: {
        isPlaying: false,
        isMuted: false,
        playbackRate: 1.0,
        currentStanza: { textArray: [], isMuted: false },
        percentDone: 0
      },
      stanzas: [{
        in: 0,    // start of stanza
        out: 8.5,  // end of stanza
        text: 'Squiggly fish, squiggly fish, swimming in the water',
        isMuted: false,
        textArray: [{
          text: 'Squiggly fish, '
        }, {
          text: 'squiggly',
          keyword: true,
          isMuted: false
        }, {
          text: ' fish, swimming in the water'
        }],
        cues: [{  // Multiple cue points
          in: 2.5,
          out: 3,
          isMuted: false
        },{
          in: 3.3,
          out: 3.79,
          isMuted: false
        },{
          in: 5.7,
          out: 6.2,
          isMuted: false
        },{
          in: 6.5,
          out: 7.1,
          isMuted: false
        }]
      }, {
        in: 8.51,
        out: 17,
        text: 'A Tuna fish, a Tuna fish swimming in the water',
        isMuted: false,
        textArray: [{
          text: 'A Tuna fish, a Tuna fish swimming in the '
        }, {
          text: 'water',
          keyword: true,
          isMuted: false
        }, {
          text: ''
        }],
        cues: [{  // Multiple cue points
          in: 13.4,
          out: 14,
          isMuted: false
        }]
      }],
      caption: 'no caption set'
    };

    this.handleToggleMute = this.handleToggleMute.bind(this);
    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.handlePlaybackRate = this.handlePlaybackRate.bind(this);
    this.handleReplayStanza = this.handleReplayStanza.bind(this);
    this.handleMuteWord = this.handleMuteWord.bind(this);
    this.getCurrentStanza = this.getCurrentStanza.bind(this);
    this.handleSliderClick = this.handleSliderClick.bind(this);
  }

  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this); // eslint-disable-line
    });
    // The interval timer that checks when to mute the volume
    this.timer = setInterval(() => {
      let currentTime = this.player.currentTime();
      // IF currentTime is in between an active stanza's cue points
      if (this.isAnyCueMuted(currentTime) || this.state.player.isMuted) {
        // TODO: Set previous volume in state
        // Mute volume
        this.player.volume(0);
      } else {
        // TODO: Set volume to previous volume
        this.player.volume(1);
      }
      // Set state with new stanzas
      this.setState(objectAssign(this.state, {
        player: objectAssign(this.state.player, {
          isPlaying: !this.player.paused(),
          currentStanza: this.getCurrentStanza(),
          percentDone: this.player.currentTime() / this.player.duration()
        }),
        caption: 'deprecated'
      }));
    }, 100);
  }

  componentWillUnmount() {
    // Destroy player
    if (this.player) {
      this.player.dispose();
    }
    // Deallocate the interval timer
    clearInterval(this.timer);
  }

  handleToggleMute() {
    this.setState(objectAssign(this.state, {
      player: objectAssign(this.state.player, {
        isMuted: !this.state.player.isMuted
      })
    }));
  }

  handlePlayPause() {
    let isPlaying;
    if (this.player.paused()) {
      this.player.play();
      isPlaying = true;
    } else {
      this.player.pause();
      isPlaying = false;
    }
    // Set state with isPlaying status
    this.setState(objectAssign(this.state, {
      player: objectAssign(this.state.player, { isPlaying })
    }));
  }

  handlePlaybackRate() {
    let { playbackRate } = this.state.player;
    switch(playbackRate) {
      case 1.0:
        playbackRate = 0.5;
        break;
      case 0.5:
        playbackRate = .25;
        break;
      case .25:
        playbackRate = 1.0;
        break;
    }
    this.player.playbackRate(playbackRate);
    // Set playbackRate in state
    this.setState(objectAssign(this.state, {
      player: objectAssign(this.state.player, { playbackRate })
    }));
  }

  handleReplayStanza() {
    const currentTime = this.player.currentTime();
    // Find the start time of the current stanza
    const stanza = this.state.stanzas.filter((stanza) => {
      return (stanza.in < currentTime && stanza.out > currentTime);
    });
    // Play at beginning of current stanza
    if (stanza.length) {
      this.player.currentTime(stanza[0].in);
    } else {
      this.player.currentTime(0);
    }
    this.player.play();
  }

  handleMuteWord() {
    const currentTime = this.player.currentTime();
    // Toggle the isMuted state for current cues
    const stanzas = this.state.stanzas.map((stanza) => {
      if (stanza.in < currentTime && stanza.out > currentTime) {
        stanza.isMuted = !stanza.isMuted;
        stanza.cues = stanza.cues.map(cue => {
          cue.isMuted = !cue.isMuted;
          return cue;
        });
      }
      return stanza;
    });
    // Set state with new stanzas
    this.setState(objectAssign(this.state, {
      stanzas
    }));
  }

  handleSliderClick(event) {
    const svg = document.getElementById("slider-rect");
    const dim = svg.getBoundingClientRect();
    const x = event.clientX - dim.left;
    const width = dim.right - dim.left;
    this.player.currentTime(this.player.duration() * (x / width));
  }

  isAnyCueMuted(currentTime) {
    return this.state.stanzas.reduce((anyMuted, stanza) => {
        return anyMuted || stanza.cues.reduce((isMuted, cue) => {
          // check if isMuted and between the cue times
          return isMuted || cue.isMuted &&
            (currentTime > cue.in &&
            currentTime < cue.out);
        }, false);
      }, false);
  }

  getCurrentStanza() {
    const currentTime = this.player.currentTime();
    // Find the start time of the current stanza
    const stanza = this.state.stanzas.filter((stanza) => {
      return (stanza.in < currentTime && stanza.out > currentTime);
    });
    return stanza.length ? stanza[0] : { textArray: [], isMuted: false };
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <section>
        <div className="leftBtns">
        <button className={this.state.player.isPlaying ? "pauseBtn" : "playBtn"} type="submit" onClick={() => this.handlePlayPause()}> </button>
        <button className="muteBtn" type="submit" onClick={() => this.handleToggleMute()}> </button>
        <button className={"speedBtn x" + this.state.player.playbackRate} type="submit" onClick={() => this.handlePlaybackRate()}>x{this.state.player.playbackRate}</button>
        
        </div>
        <div data-vjs-player>
          <video ref={node => this.videoNode = node} className="video-js"/>
        </div>
        <div className="rightBtns">
        <button className="musicBtn" type="submit" onClick={() => this.handleToggleMute()}> </button>
        <button className="speechBtn" type="submit" onClick={() => this.handleToggleMute()}> </button>
        <button className="aslBtn" type="submit" onClick={() => this.handleToggleMute()}> </button>
        </div>
        <CaptionBox handleClick={() => this.handleMuteWord()} stanza={this.state.player.currentStanza}/>
        <button className="loopBtn" type="submit" onClick={() => this.handleReplayStanza()}> </button>
        <div className="sliderbar">
        <SvgSliderBar width={400} height={30} percentDone={this.state.player.percentDone || 0} cb={this.handleSliderClick}/>
        </div>
      </section>
    );
  }
}
