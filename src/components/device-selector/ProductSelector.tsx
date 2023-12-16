import { Box, FormControlLabel, Radio, RadioGroup, Typography, useTheme } from '@mui/material';
import React from 'react';

import PowerIcon from '../../svg/power.svg';
import LightIcon from '../../svg/light.svg';
import { Controller, useFormContext } from 'react-hook-form';
import { ProductType } from '../../application/models/ProductType.ts';

export const ProductSelector = () => {
    const fieldName = 'productCode';

    const theme = useTheme();
    const { control } = useFormContext();

    return (
        <Controller
            rules={{ required: true }}
            control={control}
            name={fieldName}
            render={({ field }) => (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    width: '100%',
                    userSelect: 'none',
                    marginTop: theme.spacing(3),
                }}>
                    <DeviceSelectorItem
                        icon={PowerIcon}
                        label="Повербанк"
                        isSelected={field.value == ProductType.POWERBANK}
                        onClick={() => {
                            field.onChange(ProductType.POWERBANK)
                        }}
                    />
                    <DeviceSelectorItem
                        icon={LightIcon}
                        label="Ліхтарик"
                        isSelected={field.value == ProductType.FLASHLIGHT}
                        onClick={() => {
                            field.onChange(ProductType.FLASHLIGHT)
                        }}
                    />
                </Box>
            )}
        />
    );
}

type DeviceSelectorItemProps = {
    label: string;
    isSelected?: boolean;
    onClick: React.MouseEventHandler<HTMLDivElement>;
    icon: any;
};
export const DeviceSelectorItem: React.FC<DeviceSelectorItemProps> = ({ label, icon, onClick, isSelected = false }) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                userSelect: 'none',
                textAlign: 'center',
                width: '30%',
                cursor: 'pointer',
            }}>
            <Box sx={{
                transition: 'all 0.5s',
                userSelect: 'none',
                width: '100%',
                height: '100px',
                border: `${isSelected ? 6 : 2}px solid #3b3b3b`,
                borderRadius: '15px',
            }}>
                <img src={icon} alt="Powerbank" style={{ height: '100%', width: '100%' }}/>
            </Box>
            <Typography variant={'subtitle1'} sx={{
                transition: 'all 0.5s',
                fontWeight: `${isSelected ? 600 : 400}`,
            }}>
                {label}
            </Typography>
        </Box>
    );
}