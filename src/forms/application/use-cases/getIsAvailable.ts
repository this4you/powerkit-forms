import { IsFormAvailable } from '../models/IsFormAvailable.ts';
import { getIsFormAvailableHttp } from '../repositories/getIsFormAvailableHttp.ts';

export const getIsAvailable = async (productCode: String): Promise<IsFormAvailable> => {
    return await getIsFormAvailableHttp(productCode);
}