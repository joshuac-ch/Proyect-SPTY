import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom'
import Autprovider from './providers/Autprovider.tsx'
// Import your Publishable Key
const PUBLISHABLE_KEY = "pk_test_dml0YWwtcHJhd24tOTYuY2xlcmsuYWNjb3VudHMuZGV2JA"
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/"}>
      <Autprovider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Autprovider>
    </ClerkProvider>
  </StrictMode>,
)
