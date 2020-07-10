import React, { PureComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './general/Navigation'
import activeRoute from '../routes'

class App extends PureComponent {

  render() {
    return (
      <Router>
        <React.Fragment>
          <Navigation>
          </Navigation>
        </React.Fragment>
        {
          activeRoute()
        }
      </Router>
    )
  }
}

export default App;
