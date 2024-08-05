import { FormValidator } from '../../components/commons/form/types.ts';
//@ts-ignore
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { ValidatorFieldUtils } from './ValidatorUtils.ts';
import { CreateReceptionPointFormValues } from '../models/CreateReceptionPointFormValues.ts';

const FILE_MAX_SIZE_BYTES = 7_000_000;

export class CreateReceptionPointFormValidator implements FormValidator<CreateReceptionPointFormValues> {
    validate(data: CreateReceptionPointFormValues): FieldErrors<CreateReceptionPointFormValues> {
        return {
            name: ValidatorFieldUtils.required(data.name) || ValidatorFieldUtils.maxLength(data.name, 50),
            address: ValidatorFieldUtils.required(data.address) || ValidatorFieldUtils.maxLength(data.address, 250),
            description: ValidatorFieldUtils.required(data.description) || ValidatorFieldUtils.maxLength(data.description, 250),
            phoneNumber: ValidatorFieldUtils.required(data.phoneNumber) || this.validatePhoneNumber(data.phoneNumber),
            approveDocument: this.validateApproveDocument(data.approveDocument),
        };
    }

    private validateApproveDocument(fileList: FileList | null) {
        if (!fileList || fileList.length == 0) {
            return 'Фото місця прийому цигарок є обовʼязковим!';
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