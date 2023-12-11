import { Region } from '../models/Region.ts';
import { getRegionsByNameHttp } from '../repositories/getRegionsByNameHttp.ts';
import { IsFormAvailable } from '../models/IsFormAvailable.ts';
import { getIsFormAvailableHttp } from '../repositories/getIsFormAvailableHttp.ts';

export const getIsAvailable = async (productCode: String): Promise<IsFormAvailable> => {
    return await getIsFormAvailableHttp(productCode);
}