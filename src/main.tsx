import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './app/store'
import './styles/global.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import TanstackQueryProviders from './utils/TanstackQueryProviders'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '@material-tailwind/react'
import { BrowserRouter } from 'react-router-dom'

window.global = globalThis

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <Helmet defaultTitle="Tenshi - Смотреть аниме онлайн!" />
        <Provider store={store}>
          <TanstackQueryProviders>
            <ToastContainer stacked />
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </TanstackQueryProviders>
        </Provider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
)
