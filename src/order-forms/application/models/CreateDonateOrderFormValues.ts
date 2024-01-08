import { Region } from './Region.ts';
import { PostOffice } from './PostOffice.ts';
import { DeliveryType } from './DeliveryType.ts';

export type CreateDonateOrderFormValues = {
    productCode: string;
    name: string;
    sureName: string;
    phoneNumber: string;
    amount: number;
    deliveryType: DeliveryType;
    instagram?: string;
    militaryNumber?: string;
    region?: Region;
    postOffice?: PostOffice;
    additionalInfo?: string;
    approveDocument?: FileList;
};
