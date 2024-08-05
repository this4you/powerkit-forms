import React from 'react';
import { Box, createTheme, responsiveFontSizes, ScopedCssBaseline, ThemeProvider } from '@mui/material';
import { FormWrapper } from './forms/FormWrapper.tsx';
import { CreateReceptionPointForm } from './forms/CreateReceptionPointForm.tsx';

const theme = responsiveFontSizes(createTheme());

function CreateReceptionPointFormApp() {
    return (
        <>
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
                        <CreateReceptionPointForm/>
                    </FormWrapper>
                </Box>
                </ScopedCssBaseline>
            </ThemeProvider>
        </>
    )
}

export default CreateReceptionPointFormApp
