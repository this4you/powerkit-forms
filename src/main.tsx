import React from 'react'
import ReactDOM from 'react-dom/client'
import OrderFormApp from './OrderFormApp.tsx'
import { ProductType } from './application/models/ProductType.ts';
import DonateOrderFormApp from './DonateOrderFormApp.tsx';

renderOrderForm('powerbank-form', ProductType.POWERBANK);
renderOrderForm('flashlight-form', ProductType.FLASHLIGHT);
renderDonateOrderForm('donate-form');

function renderOrderForm(formRootId: string, productType: ProductType) {
    const rootEl = document.getElementById(formRootId);

    if (rootEl) {
        ReactDOM.createRoot(rootEl).render(<OrderFormApp productType={productType}/>);
    }
}

function renderDonateOrderForm(formRootId: string) {
    const rootEl = document.getElementById(formRootId);

    if (rootEl) {
        ReactDOM.createRoot(rootEl).render(<DonateOrderFormApp/>);
    }
}