import axios from 'axios';
import { CreateOrderResponse } from './models/CreateOrderResponse.ts';
import { CreateOrderRequest } from './models/CreateOrderRequest.ts';
import { BASE_URL } from './axios.ts';
import { CreateDonateOrder } from '../models/CreateDonateOrder.ts';

const URL = `${BASE_URL}CreateDonate`;
export const createDonateOrderHttp = async (createOrder: CreateDonateOrder): Promise<CreateOrderResponse> => {
    const response = await axios.create().post<CreateOrderRequest, CreateOrderResponse, {}>(
        URL,
        {
            Name: createOrder.name,
            SureName: createOrder.sureName,
            Instagram: createOrder.instagram,
            PhoneNumber: createOrder.phoneNumber,
            MilitaryNumber: createOrder.militaryNumber,
            Region: createOrder.region,
            PostOffice: createOrder.postOffice,
            AdditionalInfo: createOrder.additionalInfo,
            Amount: createOrder.amount,
            File: {
                ApproveDocument: createOrder.file.approveDocument,
                Name: createOrder.file.name
            },
            ProductCode: createOrder.productCode
        }
    );

    //@ts-ignore
    return response.data;
}