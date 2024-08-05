import axios from 'axios';
import { CreateResponse } from './models/CreateResponse.ts';
import { BASE_URL } from '../../../commons/axios.ts';
import { CreateReceptionPoint } from '../models/CreateReceptionPoint.ts';

const URL = `${BASE_URL}CreateReceptionPoint`;
export const createReceptionPointHttp = async (createReceptionPoint: CreateReceptionPoint): Promise<CreateResponse> => {
    const response = await axios.create().post(
        URL,
        {
            Name: createReceptionPoint.name,
            PhoneNumber: createReceptionPoint.phoneNumber,
            Address: createReceptionPoint.address,
            Description: createReceptionPoint.description,
            File: {
                ApproveDocument: createReceptionPoint.file.approveDocument,
                Name: createReceptionPoint.file.name
            }
        }
    );

    //@ts-ignore
    return response.data;
}