import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ProductType } from './application/models/ProductType.ts';

ReactDOM.createRoot(document.getElementById('powerbank-form')!).render(<App productType={ProductType.POWERBANK} />);
ReactDOM.createRoot(document.getElementById('flashlight-form')!).render(<App productType={ProductType.FLASHLIGHT} />);
