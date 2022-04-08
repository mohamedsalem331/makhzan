import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/MuiTheme'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.register()
