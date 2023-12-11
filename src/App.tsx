import React from 'react';
import { Box, createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { OrderForm } from './forms/order-form/OrderForm.tsx';
import { FormWrapper } from './forms/form-wrapper/FormWrapper.tsx';
import { ProductType } from './application/models/ProductType.ts';

const theme = responsiveFontSizes(createTheme());

type AppConfig = {
    productType: ProductType
}
function App({productType}:AppConfig) {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
            }}>
                <CssBaseline/>
                <FormWrapper productType={productType}>
                    <OrderForm productType={productType}/>
                </FormWrapper>
                {/*<DonateForm/>*/}
            </Box>
        </ThemeProvider>
    )
}

export default App
