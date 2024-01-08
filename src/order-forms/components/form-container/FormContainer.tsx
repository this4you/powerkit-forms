import React, { PropsWithChildren } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { ClipLoader as Loader } from 'react-spinners';

type FormContainerProps = {
    isLoading?: boolean;
} & PropsWithChildren;

export const FormContainer: React.FC<FormContainerProps> = ({ children, isLoading = false }) => {
    const theme = useTheme();

    return (
        <Box sx={{
            color: '#010101',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            flexDirection: 'column',
            borderRadius: '20px',
            maxWidth: '450px',
            width: '95vw',
            minHeight: '600px',
            overflowY: 'scroll',
            backgroundColor: '#ffffff',
            position: 'relative',
            margin: theme.spacing(1),
        }}>
            { isLoading && <Box sx={{
                borderRadius: '20px',
                position: 'fixed',
                height: '100%',
                width: '100%',
                display: 'flex',
                backgroundColor: '#f2f2f2bd',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto',
                zIndex: '1000',
            }}>
                <Loader
                    color={'black'}
                    loading
                    size={70}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                <Typography variant="subtitle1" sx={{
                    marginLeft: theme.spacing(1),
                }}>
                    Обробка замовлення...
                </Typography>
            </Box>
            }
            {children}
        </Box>
    );
}