import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import reducer from './reducers/index'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css'

const store = createStore(reducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
