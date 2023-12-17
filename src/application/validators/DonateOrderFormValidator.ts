import { FormValidator } from '../../components/commons/form/types.ts';
//@ts-ignore
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { ValidatorFieldUtils } from './ValidatorUtils.ts';
import { CreateDonateOrderFormValues } from '../models/CreateDonateOrderFormValues.ts';
import { DeliveryType } from '../models/DeliveryType.ts';

const FILE_MAX_SIZE_BYTES = 7_000_000;
const MAX_POWER_AMOUNT = 30;

export class DonateOrderFormValidator implements FormValidator<CreateDonateOrderFormValues> {
    validate(data: CreateDonateOrderFormValues): FieldErrors<CreateDonateOrderFormValues> {
        return {
            name: ValidatorFieldUtils.required(data.name) || ValidatorFieldUtils.maxLength(data.name, 50),
            sureName: ValidatorFieldUtils.required(data.sureName) || ValidatorFieldUtils.maxLength(data.sureName, 50),
            phoneNumber: ValidatorFieldUtils.required(data.phoneNumber) || this.validatePhoneNumber(data.phoneNumber),
            amount: ValidatorFieldUtils.rangeAmount(data.amount, 1, MAX_POWER_AMOUNT),
            region: data.deliveryType == DeliveryType.NOVA_POSHTA ? ValidatorFieldUtils.required(data.region) : '',
            postOffice: data.deliveryType == DeliveryType.NOVA_POSHTA ? ValidatorFieldUtils.required(data.postOffice) : '',
            approveDocument: this.validateApproveDocument(data.approveDocument),
        };
    }

    private validateApproveDocument(fileList: FileList | null) {
        if (!fileList || fileList.length == 0) {
            return 'Фото підтвердження є обовʼязковим!';
        }

        if (fileList[0]?.size > FILE_MAX_SIZE_BYTES) {
            return 'Розмір фото є завеликий, завантажте будь ласка інше фото';
        }
    }

    private validatePhoneNumber(phoneNumber: String | null) {
        phoneNumber = phoneNumber.replace('*', '');

        if (phoneNumber && phoneNumber.length < 17) {
            return 'Потрібно заповнити номер телефону'
        }
    }
}