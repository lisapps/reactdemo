import React from 'react';
import PropTypes from 'prop-types';

const CaptionBox = (props) => {
  const { textArray, isMuted } = props.stanza;
  return (
    <div className="caption-box">
      <h1 onClick={props.handleClick}>{(textArray.length ? textArray[0].text : '')}
        <em className={isMuted ? 'muted' : ''}>{(textArray.length ? textArray[1].text : '')}</em>
        {(textArray.length ? textArray[2].text : '')}
      </h1>
    </div>
  );
};

CaptionBox.propTypes = {
  stanza: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
};

CaptionBox.defaultProps = {
  stanza: {
    textArray: [],
    isMuted: false
  },
  handleClick: () => alert('clicked mute word')
};

export default CaptionBox;
