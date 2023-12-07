import React from 'react';
import { MainForm } from './components/main-form/MainForm.tsx';
import { Box, CssBaseline } from '@mui/material';
import { GeneralForm } from './components/general-form/GeneralForm.tsx';

function App() {
    return (
        <Box sx={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black'
        }}>
            <CssBaseline/>
            <GeneralForm/>
        </Box>
    )
}

export default App
