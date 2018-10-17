import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import './style.scss';
import Body from './Body/index';

require('bulma');

require('./libs/leaflet.pm.min');
require('./libs/leaflet.pm.css');

const GlobalRouter = () => {
  if (process.env.NODE_ENV === 'development') {
    return (
      <Router basename="/">
        <Body />
      </Router>
    );
  }

  return (
    <Router basename="/2Gis-Map-Routes/">
      <Body />
    </Router>
  );
};

ReactDOM.render(<GlobalRouter />, document.getElementById('root'));
registerServiceWorker();
