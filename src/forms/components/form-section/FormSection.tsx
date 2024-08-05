import React, { PropsWithChildren } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { flexStyles } from '../../../utils/flexStyles.ts';

type FormSectionProps = {
    position: number;
    label: string;
} & PropsWithChildren;
export const FormSection: React.FC<FormSectionProps> = ({ position, label, children }) => {
    const theme = useTheme();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '90%',
            marginTop: theme.spacing(4)
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                width: '90%',
            }}>
                <Box sx={{
                    ...flexStyles.center,
                    width: '40px',
                    height: '40px',
                    color: '#3b3b3b',
                    border: '3px solid #3b3b3b',
                    borderRadius: '30px',
                }}>
                    <Typography variant={'h5'}>
                        {position}
                    </Typography>
                </Box>
                <Typography
                    sx={{
                        marginLeft: theme.spacing(2),
                        color: '#3b3b3b'
                    }}
                    variant={'h6'}>
                    {label}
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
            }}>
                {children}
            </Box>
        </Box>
    );
}
