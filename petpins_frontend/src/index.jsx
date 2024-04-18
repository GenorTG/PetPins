import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import packageJson from '../package.json'

window.appVersion = packageJson.version


ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider 
        clientId={import.meta.env.VITE_NEXT_PUBLIC_GOOGLE_API_TOKEN}>
        <React.StrictMode>
            <Router>
                <App />
            </Router>
        </React.StrictMode>
    </GoogleOAuthProvider>
)