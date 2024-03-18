import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux'
import {store,persistor} from './Redux/Store'
import { PersistGate } from 'redux-persist/integration/react'

import { ErrorBoundary } from 'react-error-boundary'

import Error from './Pages/Error/Error'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <ErrorBoundary FallbackComponent={Error} onReset={()=>{location.href = '/'}}>
         <App />
      </ErrorBoundary>
    </PersistGate>
  </Provider>,
)
