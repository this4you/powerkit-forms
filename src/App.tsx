import React from 'react';
import { Box, createTheme, CssBaseline, responsiveFontSizes, ScopedCssBaseline, ThemeProvider } from '@mui/material';
import { OrderForm } from './forms/order-form/OrderForm.tsx';
import { FormWrapper } from './forms/form-wrapper/FormWrapper.tsx';
import { ProductType } from './application/models/ProductType.ts';
import { FormType } from './application/models/FormType.ts';
import { DonateForm } from './forms/donate-form/DonateForm.tsx';

const theme = responsiveFontSizes(createTheme());

type AppConfig = {
    productType?: ProductType;
    formType: FormType;
}

function App({ productType, formType }: AppConfig) {
    return (
        <ThemeProvider theme={theme}>
            <ScopedCssBaseline>
                <Box sx={{
                    minHeight: '100vh',
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'black',
                }}>
                    {
                        getFormByType(formType, productType)
                    }
                </Box>
            </ScopedCssBaseline>
        </ThemeProvider>
    )
}

function getFormByType(formType: FormType, productType?: ProductType) {
    switch (formType) {
        case FormType.DONATE_FORM:
            return (
                <FormWrapper>
                    <DonateForm/>
                </FormWrapper>
            );
        case FormType.ORDER_FORM:
            if (productType != null ) {
                return (
                    <FormWrapper productType={productType}>
                        <OrderForm productType={productType}/>
                    </FormWrapper>
                );
            } else {
                return "No Product type found"
            }
        default: return "No form found";
    }
}

export default App
