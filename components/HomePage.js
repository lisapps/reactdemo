import React from 'react';
import IntroPlayer from './IntroPlayer';

const HomePage = () => {
  const videoJsOptions = {
    autoplay: true,
    controls: false,
    sources: [{
      src: 'https://s3-us-west-1.amazonaws.com/los-extremos/doowah/DoowahDiddeos_FINAL.mp4',
      type: 'video/mp4'
    }]
  };

  return (
    <div className="container-fluid">
      <IntroPlayer {...videoJsOptions}/>
    </div>
  );
};

export default HomePage;
