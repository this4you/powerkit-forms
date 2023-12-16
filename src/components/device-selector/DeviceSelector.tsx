import { Box, useTheme } from '@mui/material';
import React from 'react';

export const DeviceSelector = () => {
    const theme = useTheme();
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
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