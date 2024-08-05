import { FormResult } from '../models/FormResult.ts';
import { CreateReceptionPointFormValues } from '../models/CreateReceptionPointFormValues.ts';
import { CreateReceptionPoint } from '../models/CreateReceptionPoint.ts';
import { createReceptionPointHttp } from '../repositories/createReceptionPointHttp.ts';

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

const mapFormValues = async (createOrderFormValues: CreateReceptionPointFormValues): Promise<CreateReceptionPoint> => ({
    ...createOrderFormValues,
    file: {
        name: createOrderFormValues.approveDocument[0].name,
        approveDocument: await convertFileToByteArray(createOrderFormValues.approveDocument[0])
    },
    phoneNumber: createOrderFormValues.phoneNumber.replace(/\D/g, ''),
});

export const createReceptionPoint = (setFormResult: (formResult: FormResult) => void, setLoading: (isLoading: boolean) => void) =>
    async (createReceptionPointFormValues: CreateReceptionPointFormValues) => {
        setLoading(true);

        try {
            const createReceptionPoint = await mapFormValues(createReceptionPointFormValues);

            const response = await createReceptionPointHttp(createReceptionPoint);

            setFormResult({
                code: response.StatusCode,
                message: response.Message
            });
        } catch (e) {
            setFormResult({
                code: "-1",
                message: "Виникла помилка в процесі створення пункту прийому. Будь ласка, напишіть нам в instagram"
            });
        } finally {
            setLoading(false);
        }
    }