import React from 'react'
import ReactDOM from 'react-dom/client'
import OrderFormApp from './forms/OrderFormApp.tsx'
import { ProductType } from './forms/application/models/ProductType.ts';
import DonateOrderFormApp from './forms/DonateOrderFormApp.tsx';
import DashboardApp from './dashboard/DashboardApp.tsx';
import CreateReceptionPointFormApp from './forms/CreateReceptionPointFormApp.tsx';

const powerkitComponents = [
    {
        id: 'powerbank-form',
        component: <OrderFormApp productType={ProductType.POWERBANK}/>
    },
    {
        id: 'flashlight-form',
        component: <OrderFormApp productType={ProductType.FLASHLIGHT}/>
    },
    {
        id: 'donate-form',
        component: <DonateOrderFormApp/>
    },
    {
        id: 'powerkit-dashboard',
        component: <DashboardApp/>
    },
    {
        id: 'create-reception-point-form',
        component: <CreateReceptionPointFormApp/>
    },
];


powerkitComponents.forEach(componentInfo => {
    const { id, component } = componentInfo;

    const rootEl = document.getElementById(id);

    if (rootEl) {
        ReactDOM.createRoot(rootEl).render(component);
    }
})