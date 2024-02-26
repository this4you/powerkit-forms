import { FormResult } from '../models/FormResult.ts';
import { CreateDonateOrderFormValues } from '../models/CreateDonateOrderFormValues.ts';
import { CreateDonateOrder } from '../models/CreateDonateOrder.ts';
import { DeliveryType } from '../models/DeliveryType.ts';
import { createDonateOrderHttp } from '../repositories/createDonateOrderHttp.ts';

const convertFileToByteArray = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = function () {
            resolve(
                reader?.result?.toString()
                    ?.replace('data:', '')
                    ?.replace(/^.+,/, '')
            );
        }
    });
}

const mapAdditionalInfo = (deliveryType: DeliveryType, additionalInfo: string): string => {
    if (deliveryType == DeliveryType.SELF_DELIVERY) {
        return 'Самовивіз. ' + (additionalInfo ?? '');
    } else {
        return additionalInfo;
    }
}
const mapFormValues = async (createDonateOrderFormValues: CreateDonateOrderFormValues): Promise<CreateDonateOrder> => ({
    ...createDonateOrderFormValues,
    file: createDonateOrderFormValues.approveDocument && createDonateOrderFormValues.approveDocument.length > 0 ? {
        name: createDonateOrderFormValues.approveDocument[0].name,
        approveDocument: await convertFileToByteArray(createDonateOrderFormValues.approveDocument[0])
    } : null,
    phoneNumber: createDonateOrderFormValues.phoneNumber.replace(/\D/g, ''),
    region: createDonateOrderFormValues?.region?.id || null,
    postOffice: createDonateOrderFormValues.postOffice?.id || null,
    additionalInfo: mapAdditionalInfo(
        createDonateOrderFormValues.deliveryType,
        createDonateOrderFormValues.additionalInfo
    ),
    isSelfDelivery: createDonateOrderFormValues.deliveryType === DeliveryType.SELF_DELIVERY
});


export const createDonateOrder = (setFormResult: (formResult: FormResult) => void, setLoading: (isLoading: boolean) => void) =>
    async (createDonateOrderFormValues: CreateDonateOrderFormValues) => {
        setLoading(true);
        try {
            const createOrder = await mapFormValues(createDonateOrderFormValues);

            console.log('CREATE DONATE ORDER', createOrder)
            const response = await createDonateOrderHttp(createOrder);

            setFormResult({
                code: response.StatusCode,
                message: response.Message
            });
        } catch (e) {
            setFormResult({
                code: '-1',
                message: 'Виникла помилка в процесі створення замовлення. Будь ласка, напишіть нам в instagram'
            });
        } finally {
            setLoading(false);
        }
    }