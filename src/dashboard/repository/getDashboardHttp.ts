import axios from 'axios';
import { BASE_URL } from '../../commons/axios.ts';
import { DashboardModel } from '../application/models/DashboardModel.ts';

const URL = `${BASE_URL}GetDashboard`;
export const getDashboardHttp = async (): Promise<DashboardModel> => {
    const response = await axios.create().get<{}, DashboardModel, {}>(URL);

    //@ts-ignore
    return response.data;
}