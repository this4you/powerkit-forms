import React from 'react'
import ReactDOM from 'react-dom/client'
import OrderFormApp from './order-forms/OrderFormApp.tsx'
import { ProductType } from './order-forms/application/models/ProductType.ts';
import DonateOrderFormApp from './order-forms/DonateOrderFormApp.tsx';

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