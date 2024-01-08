import axios from 'axios';
import { CreateOrder } from '../models/CreateOrder.ts';
import { CreateOrderResponse } from './models/CreateOrderResponse.ts';
import { CreateOrderRequest } from './models/CreateOrderRequest.ts';
import { BASE_URL } from './axios.ts';

const URL = `${BASE_URL}CreateOrder`;
export const createOrderHttp = async (createOrder: CreateOrder): Promise<CreateOrderResponse> => {
    const response = await axios.create().post<CreateOrderRequest, CreateOrderResponse, {}>(
        URL,
        {
            Name: createOrder.name,
            SureName: createOrder.sureName,
            Email: createOrder.email,
            Instagram: createOrder.instagram,
            PhoneNumber: createOrder.phoneNumber,
            MilitaryNumber: createOrder.militaryNumber,
            Region: createOrder.region,
            PostOffice: createOrder.postOffice,
            AdditionalInfo: createOrder.additionalInfo,
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