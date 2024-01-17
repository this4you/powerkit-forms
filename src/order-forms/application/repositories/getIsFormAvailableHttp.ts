import axios from 'axios';
import { BASE_URL } from '../../../commons/axios.ts';
import { GetIsFormAvailableResponse } from './models/GetIsFormAvailableResponse.ts';
import { IsFormAvailable } from '../models/IsFormAvailable.ts';

const URL = `${BASE_URL}GetIsFormAvailableByProduct`;
export const getIsFormAvailableHttp = async (productCode: String): Promise<IsFormAvailable> => {
    const response = await axios.create().get<{}, GetIsFormAvailableResponse, {}>(
        URL,
        {
            params: {
                productCode
            }
        }
    );

    return {
        //@ts-ignore
        isAvailable: response.data.GetIsFormAvailableByProductResult?.IsAvailable || false,
        //@ts-ignore
        message: response.data.GetIsFormAvailableByProductResult?.Message || ''
    };
}