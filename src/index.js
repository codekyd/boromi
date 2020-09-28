/*
 *  --------------------------------------------------------------------------
 *                             External Dependencies
 *  --------------------------------------------------------------------------
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createMuiTheme, MuiThemeProvider} from'@material-ui/core';
/*
 *  --------------------------------------------------------------------------
 *                             Internal Dependencies
 *  --------------------------------------------------------------------------
 */

import store from'./store/configStore';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import makeServer from'./server';
// setup theme for the whole application
const theme = createMuiTheme({
    typography: {
        fontFamily:'"gt",san-serif',
    },
    palette: {
        primary: {
            main:'#1a268f'

        },
        default: {
            main:'#ffd467'
        }
    }
});

makeServer();

ReactDOM.render(

      <>
          <MuiThemeProvider theme={theme}>
              <Provider store={store}>
                  <App />
              </Provider>
          </MuiThemeProvider>
      </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
