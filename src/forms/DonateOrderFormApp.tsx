import React from 'react';
import { Box, createTheme, responsiveFontSizes, ScopedCssBaseline, ThemeProvider } from '@mui/material';
import { FormWrapper } from './forms/FormWrapper.tsx';
import { DonateForm } from './forms/DonateForm.tsx';

const theme = responsiveFontSizes(createTheme());

function DonateOrderFormApp() {
    return (
        <>
            {/*<CssBaseline/>*/}
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
                    <FormWrapper>
                        <DonateForm/>
                    </FormWrapper>
                </Box>
                </ScopedCssBaseline>
            </ThemeProvider>
        </>
    )
}

export default DonateOrderFormApp
