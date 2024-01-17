export type DashboardModel = {
    productsDashboard: ProductDashboardItem[],
}

export type ProductDashboardItem = {
    productCode: string;
    productName: string;
    finished: number; //завершено всього
    newOrders: number; //не перевірені
    verifiedQueue: number; //потрібно зробити черга
    verifiedDonate: number; //потрібно зробити донат
    finishedMonth: number;
    previousMonth: number;
}