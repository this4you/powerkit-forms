import { Region } from '../models/Region.ts';
import { getPostOfficesByRegionIdHttp } from '../repositories/getPostOfficesByRegionIdHttp.ts';

export const getPostOffices = async (regionId: string): Promise<Region[]> => {
    return await getPostOfficesByRegionIdHttp(regionId);
}