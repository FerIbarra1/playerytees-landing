import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppShop } from './AppShop'

import './index.css'
import "./leaflet-fix-default-icon";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppShop />
  </StrictMode>,
)
