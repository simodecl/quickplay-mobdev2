import React, { Component } from 'react';

/*
Component styles
*/
import './NotFoundPage.css';

class NotFoundPage extends Component {
  
  render() {
    return (
      <div className="main">
        <div className="container-404">
          <p className="text-404">404. We couldn't find the page you requested.</p>
          <p>Here is some random gameplay footage, obviously made possible by finding friends to play with on this site.</p>
        </div>
        <div className="wrapper">
          <div className="iframe-404">
            <iframe title="Widowmaker triple kill" src='https://gfycat.com/ifr/UnsteadyTenseAmazontreeboa' frameborder='0' scrolling='no' allowFullScreen></iframe>
          </div>
        </div>
        <div className="wrapper">
          <div className="iframe-404">
            <iframe title="Reinhardt charge" src='https://gfycat.com/ifr/SpecificUnderstatedAmurminnow' frameborder='0' scrolling='no' allowFullScreen></iframe>
          </div>
        </div>
      </div>
    )
  }
}

export default (NotFoundPage);