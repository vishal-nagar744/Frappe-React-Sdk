import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { FrappeProvider } from './lib'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
  {/** In dev, use the Vite proxy at /frappe to avoid CORS */}
  <FrappeProvider url='/frappe' enableSocket={false}>
      <App />
    </FrappeProvider>
  </React.StrictMode>
)
