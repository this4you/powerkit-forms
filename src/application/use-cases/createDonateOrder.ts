import { CreateOrderFormValues } from '../models/CreateOrderFormValues.ts';
import { CreateOrder } from '../models/CreateOrder.ts';
import { createOrderHttp } from '../repositories/createOrderHttp.ts';
import { FormResult } from '../models/FormResult.ts';
import { CreateDonateOrderFormValues } from '../models/CreateDonateOrderFormValues.ts';
import { CreateDonateOrder } from '../models/CreateDonateOrder.ts';

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

const mapFormValues = async (createDonateOrderFormValues: CreateDonateOrderFormValues): Promise<CreateDonateOrder> => ({
    ...createDonateOrderFormValues,
    file: createDonateOrderFormValues.approveDocument && createDonateOrderFormValues.approveDocument.length > 0 ? {
        name: createDonateOrderFormValues.approveDocument[0].name,
        approveDocument: await convertFileToByteArray(createDonateOrderFormValues.approveDocument[0])
    } : null,
    phoneNumber: createDonateOrderFormValues.phoneNumber.replace(/\D/g, ''),
    region: createDonateOrderFormValues?.region?.id || null,
    postOffice: createDonateOrderFormValues.postOffice?.id || null,
});

export const createDonateOrder = (setFormResult: (formResult: FormResult) => void, setLoading: (isLoading: boolean) => void) =>
    async (createDonateOrderFormValues: CreateDonateOrderFormValues) => {
        setLoading(true);
        try {
            const createOrder = await mapFormValues(createDonateOrderFormValues);

            console.log('CREATE DONATE ORDER', createOrder)
            // const response = await createOrderHttp(createOrder);
            //
            // setFormResult({
            //     code: response.StatusCode,
            //     message: response.Message
            // });
        } catch (e) {
            setFormResult({
                code: '-1',
                message: 'Виникла помилка в процесі створення замовлення. Будь ласка, напишіть нам в instagram'
            });
        } finally {
            setLoading(false);
        }
    }