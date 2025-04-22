import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import BuilderProvider from './context/BuilderContext.tsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BuilderProvider>
      <Toaster position='bottom-center' />
      <App />
    </BuilderProvider>
  </StrictMode>,
)
