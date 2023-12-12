import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ProductType } from './application/models/ProductType.ts';

renderForm('powerbank-form', ProductType.POWERBANK);
renderForm('flashlight-form', ProductType.FLASHLIGHT);

function renderForm(formRootId: string, productType: ProductType) {
    const rootEl = document.getElementById(formRootId);

    if (rootEl) {
        ReactDOM.createRoot(rootEl).render(<App productType={productType}/>);
    }
}