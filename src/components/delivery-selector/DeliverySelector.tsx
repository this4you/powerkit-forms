import { RadioGroupField } from '../commons/form/radio-group/RadioGroupField.tsx';
import { DeliveryType } from '../../application/models/DeliveryType.ts';
import React from 'react';
import { useTheme } from '@mui/material';
import { useWatch } from 'react-hook-form';
import { RegionSearchField } from '../region-search-field/RegionSearchField.tsx';
import { PostOfficeSearchField } from '../post-office-search-field/PostOfficeSearchField.tsx';

export const DeliverySelector = () => {
    const theme = useTheme();

    const deliveryType = useWatch({ name: 'deliveryType' });

    return (
        <>
            <RadioGroupField
                name={'deliveryType'}
                sx={{ marginTop: theme.spacing(2) }}
                items={[
                    {
                        label: 'Нова пошта',
                        value: DeliveryType.NOVA_POSHTA,
                    },
                    {
                        label: 'Самовивіз',
                        value: DeliveryType.SELF_DELIVERY,
                    }
                ]}/>
            {
                deliveryType === DeliveryType.NOVA_POSHTA &&
                (
                    <>
                        <RegionSearchField/>
                        <PostOfficeSearchField/>
                    </>
                )
            }

        </>
    );
}