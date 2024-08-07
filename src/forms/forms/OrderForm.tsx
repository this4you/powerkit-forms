import { FormContainer } from '../components/form-container/FormContainer.tsx';
import { Alert, Button, Typography, useTheme } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { createOrder } from '../application/use-cases/createOrder.ts';
import { FormResult } from '../application/models/FormResult.ts';
import { AppForm, FormTextField } from '../components/commons/form';
import { RegionSearchField } from '../components/region-search-field/RegionSearchField.tsx';
import { PostOfficeSearchField } from '../components/post-office-search-field/PostOfficeSearchField.tsx';
import { FileUploader } from '../components/file-uploader/FileUploader.tsx';
import { OrderFormValidator } from '../application/validators/OrderFormValidator.ts';
import { ProductType } from '../application/models/ProductType.ts';

type OrderFormProps = {
    productType: ProductType,
    setFormResult?: (formResult: FormResult) => void;
}

const fileInfoText = 'Нам необхідне підтвердження вашого статусу військовослужбовця або громадської організації.\n' +
    'Щоб підтвердити статус військовослужбовця або громадської організації, вам потрібно надати фотографію, де чітко видно ваше військове посвідчення або документи підтверджуючі діяльність неприбуткової організації. Переконайтеся, що на зображенні чітко видно всі необхідні деталі.';

const phoneMaskConfig = { mask: '+38 999 999 99 99', maskChar: '*' };

export const OrderForm: React.FC<OrderFormProps> = ({ setFormResult, productType }) => {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const createOrderHandler = useMemo(() => createOrder(setFormResult, setLoading), [setFormResult]);
    const inputStyle = {
        width: '80%',
        marginTop: theme.spacing(2)
    };
    const { title } = getProductTypeConfig(productType);

    return (
        <FormContainer isLoading={loading}>
            <Typography variant="h4" sx={{
                textAlign: 'center',
                margin: theme.spacing(4),
            }}>
                {title}
            </Typography>

            <Alert severity="info">
                Можна замовити один пристрій для одного військового
            </Alert>

            <Alert sx={{ marginTop: theme.spacing(1) }} severity="info">
                Терміни залежать від кількості замовлень і від вашої черги.
                Терміни можуть розтягуватись до 2-3 тижнів, в залежності від кількості волонтерів і наповненості банки
            </Alert>

            <AppForm
                submit={createOrderHandler}
                formValidator={new OrderFormValidator()}
                defaultValues={{
                  productCode: productType
                }}
            >
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
                    required sx={inputStyle}
                    id="email" name="email"
                    type="email"
                    label="Email"
                    variant="standard"
                />
                <FormTextField
                    required sx={inputStyle}
                    id="instagram"
                    name="instagram"
                    label="Instagram"
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
                    required
                    sx={inputStyle}
                    id="militaryNumber"
                    name="militaryNumber"
                    label="Номер військової частини"
                    variant="standard"
                />
                <RegionSearchField/>
                <PostOfficeSearchField/>
                <FormTextField
                    sx={inputStyle}
                    id="additionalInfo"
                    name="additionalInfo"
                    label="Додаткова інформація"
                    variant="standard"
                />
                <FileUploader fileInfoText={fileInfoText}/>
                <Button type="submit"
                        sx={{
                            marginTop: '15px',
                            marginBottom: '15px',
                            width: '80%'
                        }}
                        variant="contained">
                    Замовити
                </Button>
            </AppForm>

        </FormContainer>
    );
}

function getProductTypeConfig(productType: ProductType): { title: string } {
    switch (productType) {
        case ProductType.POWERBANK:
            return {
                title: 'Форма замовлення повербанку'
            }
        case ProductType.FLASHLIGHT:
            return {
                title: 'Форма замовлення ліхтарика'
            }
    }
}