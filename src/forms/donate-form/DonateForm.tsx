import { Alert, Box, Typography, useTheme } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { flexStyles } from '../../utils/flexStyles.ts';
import { FormContainer } from '../../components/form-container/FormContainer.tsx';

export const DonateForm = () => {
    const theme = useTheme();

    return (
            <FormContainer>
                <Typography variant="h4" sx={{
                    marginTop: theme.spacing(4),
                    marginBottom: theme.spacing(4)
                }}>
                    Форма замовлення
                </Typography>

                <Alert severity="info">Ви можете замовити один тип пристрою для одного військово</Alert>

                <FormSection position={1} label="Виберіть пристрій">
                    <DeviceSelector/>
                </FormSection>

                <FormSection position={2} label="Заповніть дані">

                </FormSection>

                <FormSection position={3} label="Завантажте фото">

                </FormSection>

            </FormContainer>
    )
};

type FormSectionProps = {
    position: number;
    label: string;
} & PropsWithChildren;
const FormSection: React.FC<FormSectionProps> = ({ position, label, children }) => {
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

            {children}
        </Box>
    );
}

const DeviceSelector = () => {
    const theme = useTheme();
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: theme.spacing(3),
        }}>
            <DeviceSelectorItem label="Повербанк" isSelected/>
            <DeviceSelectorItem label="Ліхтарик"/>
        </Box>
    );
}

type DeviceSelectorItemProps = {
    label: string;
    isSelected?: boolean;
};
const DeviceSelectorItem: React.FC<DeviceSelectorItemProps> = ({ label, isSelected = false }) => {
    return (
        <Box sx={{
            cursor: 'point',
            width: '30%',
            height: '100px',
            border: `${isSelected ? 4 : 2}px solid #3b3b3b`,
            borderRadius: '15px',
        }}>

        </Box>
    );
}