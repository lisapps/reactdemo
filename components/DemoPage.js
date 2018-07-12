import React from 'react';
import VideoPlayer from './VideoPlayer';

const DemoPage = () => {
  const videoJsOptions = {
    autoplay: false,
    controls: false,
    sources: [{
      src: 'https://s3-us-west-1.amazonaws.com/los-extremos/doowah/movie.mp4',
      type: 'video/mp4'
    }]
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-default ">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#defaultNavbar1">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
          </button>
          <a className="navbar-brand" href="#">
            <img className="bobby"
                 src="https://s3-us-west-1.amazonaws.com/los-extremos/doowah/Bobby-Doowah-4.png"/>
            <img className="logo"
                 src="https://s3-us-west-1.amazonaws.com/los-extremos/doowah/Bobby-Doowah-1.png"/>
          </a>
        </div>

        <div className="collapse navbar-collapse" id="defaultNavbar1">
          <ul className="nav navbar-nav">
            <li className="active"/>
            <li/>
            <li className="dropdown">
              <ul className="dropdown-menu" role="menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li className="divider"/>
                <li><a href="#">Separated link</a></li>
                <li className="divider"/>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
          </ul>

        </div>
      </nav>

      <div className="row first-row">
        <div className="col-xs-2">
            <div className="side-menu">
              <div className="side-menu-head-img">
                <img src="https://s3-us-west-1.amazonaws.com/los-extremos/doowah/Asset_47.png" width="600" height="189" alt=""/>
              </div>
              <div className="side-menu-head-diddeos">
                <h3 className="diddeos">More Diddeos</h3>
                <a href="#" className="diddeos-button"></a>
              </div>
              <div className="side-menu-head-games">
                <h3 className="games">Games</h3>
                <a href="#" className="game-button"></a>
              </div>
              <div className="side-menu-head-toons">
                <h3 className="toons">Toons</h3>
                <a href="#" className="toon-button"></a>
              </div>
          </div>
        </div>
        <div className="center col-xs-8 video">
          <VideoPlayer {...videoJsOptions}/>
        </div>
        <div className="col-xs-2">
          <div className="top-right-label">
            <h3 className="tracks">Doowah Pack 1</h3>
          </div>
          <div className="playlist">
            <img className="track" src="https://s3-us-west-1.amazonaws.com/los-extremos/doowah/video1.png" alt=""/>
            <img className="track" src="https://s3-us-west-1.amazonaws.com/los-extremos/doowah/video2.png" alt=""/>
          </div>
        </div>
      </div>

      <div className="row" >
        <div className="col-xs-2"/>
        <div className="col-xs-8" />
        <div className="text-center col-xs-2"/>
      </div>
      <div className="row">
        <div className="text-center col-xs-6 col-xs-offset-3">
          <h4>&nbsp;</h4>
          <p>Copyright &copy; 2017 &middot;</p>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
