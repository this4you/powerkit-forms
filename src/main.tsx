import React from 'react'
import ReactDOM from 'react-dom/client'
import OrderFormApp from './order-forms/OrderFormApp.tsx'
import { ProductType } from './order-forms/application/models/ProductType.ts';
import DonateOrderFormApp from './order-forms/DonateOrderFormApp.tsx';
import DashboardApp from './dashboard/DashboardApp.tsx';

renderOrderForm('powerbank-form', ProductType.POWERBANK);
renderOrderForm('flashlight-form', ProductType.FLASHLIGHT);
renderDonateOrderForm('donate-form');
renderDashboard('powerkit-dashboard');

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

function renderDashboard(formRootId: string) {
    const rootEl = document.getElementById(formRootId);

    if (rootEl) {
        ReactDOM.createRoot(rootEl).render(<DashboardApp/>);
    }
}