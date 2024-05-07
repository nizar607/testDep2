import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './assets/fonts/icomoon/style.css'
import './assets/css/bootstrap/bootstrap.css'
import './assets/css/jquery-ui.css'
import './assets/css/owl.carousel.min.css'
import './assets/css/owl.theme.default.min.css'
import './assets/css/jquery.fancybox.min.css'
import './assets/css/bootstrap-datepicker.css'
import './assets/fonts/flaticon/font/flaticon.css'
import './assets/css/aos.css'
import './assets/css/style.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
