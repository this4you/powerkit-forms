import React from 'react';
import { Box, createTheme, CssBaseline, responsiveFontSizes, ScopedCssBaseline, ThemeProvider } from '@mui/material';
import { ProductsDashboard } from './components/ProductsDashboard.tsx';

const theme = responsiveFontSizes(createTheme());

function DashboardApp() {
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
                        <ProductsDashboard/>
                    </Box>
                </ScopedCssBaseline>
            </ThemeProvider>
        </>
    )
}

export default DashboardApp
