import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
// import {PersistGate} from 'redux-persist/integration/react';

import store from './store'; // {persistor}
import App from './components/App/App';

document.body.innerHTML = '<div id="app"></div>';
const root = createRoot(document.getElementById('app'));
root.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <App />
    {/* </PersistGate> */}
  </Provider>
);