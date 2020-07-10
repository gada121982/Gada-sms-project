import React, { PureComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Header from '../components/general/Header'
import Control from './general/Control'
import activeRoute from '../routes'

import './app.css'

class App extends PureComponent {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <main>
            <Control />
            {
              activeRoute()
            }
          </main>
        </React.Fragment>
      </Router>
    )
  }
}

export default App;
