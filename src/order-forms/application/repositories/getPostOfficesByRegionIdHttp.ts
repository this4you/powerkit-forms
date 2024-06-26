import { GetRegionsResponse } from './models/GetRegionsResponse.ts';
import { appAxios, BASE_URL } from '../../../commons/axios.ts';
import { PostOffice } from '../models/PostOffice.ts';

const URL = `${BASE_URL}GetPostOfficesByRegionId`;
export const getPostOfficesByRegionIdHttp = async (regionId: string): Promise<PostOffice[]> => {
    const response = await appAxios.get<{}, GetRegionsResponse, {}>(
        URL,
        {
            params: {regionId: regionId},
        }
    );

    //@ts-ignore
    return sortAddresses(response.data.GetPostOfficesByRegionIdResult?.map(it => ({
        id: it.Id,
        name: reformatAddress(it.Name),
    })) || []).filter(it => !it.name.includes("Поштомат"));
}


function reformatAddress(inputString: string): string {
    const match = inputString.match(/№\d+/);

    if (match) {
        const firstMatch = match[0];
        const updatedString = inputString.replace(firstMatch, '');
        const reformattedString = `${firstMatch.trim()} ${updatedString.trim()}`;
        return reformattedString.replace(',', '');
    } else {
        return inputString
    }
}

function sortAddresses(address: PostOffice[]): PostOffice[] {
    address.sort((a, b) => {
        const aMatch = a.name.match(/№(\d+)/);
        const bMatch = b.name.match(/№(\d+)/);

        const numberA = (aMatch?.length > 0 && parseInt(aMatch[1])) || 0;
        const numberB = (bMatch?.length > 0 && parseInt(bMatch[1])) || 0;

        return numberA - numberB;
    });

    return address;
}