import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

import PowerIcon from '../../svg/power.svg';
import LightIcon from '../../svg/light.svg';

export const DeviceSelector = () => {
    const theme = useTheme();
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            marginTop: theme.spacing(3),
        }}>
            <DeviceSelectorItem icon={PowerIcon} label="Повербанк" isSelected/>
            <DeviceSelectorItem icon={LightIcon} label="Ліхтарик"/>
        </Box>
    );
}

type DeviceSelectorItemProps = {
    label: string;
    isSelected?: boolean;
    icon: any;
};
const DeviceSelectorItem: React.FC<DeviceSelectorItemProps> = ({ label, icon, isSelected = false }) => {
    return (
        <Box sx={{
            textAlign: 'center',
            width: '30%',
            cursor: 'pointer'
        }}>
        <Box sx={{
            width: '100%',
            height: '100px',
            border: `${isSelected ? 6 : 2}px solid #3b3b3b`,
            borderRadius: '15px',
        }}>
            <img src={icon} alt="Powerbank" style={{height: '100%', width: '100%'}} />
        </Box>
            <Typography variant={'subtitle1'}>
                {label}
            </Typography>
        </Box>
    );
}