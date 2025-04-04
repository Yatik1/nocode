import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import BuilderProvider from './context/BuilderContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BuilderProvider>
      <App />
    </BuilderProvider>
  </StrictMode>,
)
