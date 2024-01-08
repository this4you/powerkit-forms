import { Alert, Button, Typography, useTheme } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { FormContainer } from '../../components/form-container/FormContainer.tsx';
import { FormSection } from '../../components/form-section/FormSection.tsx';
import { ProductSelector } from '../../components/product-selector/ProductSelector.tsx';
import { FormResult } from '../../application/models/FormResult.ts';
import { AppForm, FormTextField } from '../../components/commons/form';
import { FileUploader } from '../../components/file-uploader/FileUploader.tsx';
import { DeliveryType } from '../../application/models/DeliveryType.ts';
import { DonateOrderFormValidator } from '../../application/validators/DonateOrderFormValidator.ts';
import { createDonateOrder } from '../../application/use-cases/createDonateOrder.ts';
import { DeliverySelector } from '../../components/delivery-selector/DeliverySelector.tsx';
import { ProductType } from '../../application/models/ProductType.ts';

type DonateFormProps = {
    setFormResult?: (formResult: FormResult) => void;
}

const phoneMaskConfig = { mask: '+38 999 999 99 99', maskChar: '*' };
const fileInfoText = 'Нам необхідне підтвердження донату. Це може бути скріншот квитанції.';

export const DonateForm: React.FC<DonateFormProps> = ({ setFormResult }) => {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const createOrderHandler = useMemo(() => createDonateOrder(setFormResult, setLoading), [setFormResult]);
    const inputStyle = {
        width: '80%',
        marginTop: theme.spacing(1)
    };

    return (
        <FormContainer isLoading={loading}>
            <Typography variant="h4" sx={{
                marginTop: theme.spacing(4),
            }}>
                Замовлення за донат
            </Typography>

            <Alert sx={{
                marginTop: theme.spacing(4),
            }} severity="info">
                Якщо ви волонтер, то вкажіть ваші дані в полі Додаткова інформація.
            </Alert>

            <AppForm
                submit={createOrderHandler}
                formValidator={new DonateOrderFormValidator()}
                defaultValues={{
                    amount: 1,
                    deliveryType: DeliveryType.NOVA_POSHTA,
                    productCode: ProductType.POWERBANK
                }}
            >
                <FormSection position={1} label="Виберіть пристрій">
                    <ProductSelector/>
                </FormSection>

                <FormSection position={2} label="Заповніть дані">
                    <FormTextField
                        required sx={inputStyle}
                        id="name"
                        name="name"
                        label="Імʼя отримувача"
                        variant="standard"
                    />
                    <FormTextField
                        required sx={inputStyle}
                        id="sureName"
                        name="sureName"
                        label="Прізвище отримувача"
                        variant="standard"
                    />
                    <FormTextField
                        required
                        sx={inputStyle}
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        label="Номер телефону отримувача"
                        variant="standard"
                        maskConfig={phoneMaskConfig}
                    />
                    <FormTextField
                        required sx={inputStyle}
                        type="number"
                        id="amount"
                        name="amount"
                        label="Кількість"
                        variant="standard"
                    />
                    <FormTextField
                        sx={inputStyle}
                        id="militaryNumber"
                        name="militaryNumber"
                        label="Номер військової частини"
                        variant="standard"
                    />
                    <FormTextField
                        sx={inputStyle}
                        id="instagram"
                        name="instagram"
                        label="Instagram"
                        variant="standard"
                    />
                    <FormTextField
                        sx={inputStyle}
                        id="additionalInfo"
                        name="additionalInfo"
                        label="Додаткова інформація"
                        variant="standard"
                    />
                </FormSection>

                <FormSection position={3} label="Завантажте фото">
                    <FileUploader fileInfoText={fileInfoText}/>
                </FormSection>

                <FormSection position={4} label="Виберіть спосіб доставки">
                    <DeliverySelector/>
                </FormSection>

                <Button type="submit"
                        sx={{
                            marginTop: theme.spacing(4),
                            marginBottom: theme.spacing(4),
                            width: '80%'
                        }}
                        variant="contained">
                    Замовити
                </Button>
            </AppForm>

        </FormContainer>
    )
};
