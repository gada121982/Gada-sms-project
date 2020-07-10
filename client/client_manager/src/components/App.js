import React, { PureComponent } from 'react';
import Header from '../components/general/Header'
import SidebarLeft from '../components/general/SidebarLeft'
import Conversation from '../components/general/Conversation'
import SidebarRight from '../components/general/SidebarRight'
import './app.css'

class App extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Header />
        <main>
          <SidebarLeft />
          <Conversation />
          <SidebarRight />
        </main>
      </React.Fragment>
    )
  }
}

export default App;
