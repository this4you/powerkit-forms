import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ProductType } from './application/models/ProductType.ts';
import { FormType } from './application/models/FormType.ts';

renderForm('powerbank-form', FormType.ORDER_FORM, ProductType.POWERBANK);
renderForm('flashlight-form', FormType.ORDER_FORM, ProductType.FLASHLIGHT);
renderForm('donate-form', FormType.DONATE_FORM);

function renderForm(formRootId: string, formType: FormType, productType?: ProductType) {
    const rootEl = document.getElementById(formRootId);

    if (rootEl) {
        ReactDOM.createRoot(rootEl).render(<App productType={productType} formType={formType}/>);
    }
}