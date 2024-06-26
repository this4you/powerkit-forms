import React, { useEffect, useMemo, useState } from 'react';
import { AutocompleteTextField } from '../commons/form/autocomplete-field/AutocompleteTextField.tsx';
import { debounce } from 'lodash';
import { getPostOffices } from '../../application/use-cases/getPostOffices.ts';
import { useFormContext, useWatch } from 'react-hook-form';
import { CreateOrderFormValues } from '../../application/models/CreateOrderFormValues.ts';
import { Region } from '../../application/models/Region.ts';
import { PostOffice } from '../../application/models/PostOffice.ts';
import { autocompleteClasses, Box, useTheme } from '@mui/material';

export const PostOfficeSearchField: React.FC = () => {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [selectedOffice, setSelectedOffice] = useState<PostOffice | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [options, setOptions] = useState<PostOffice[]>([]);
    const [postOffices, setPostOffices] = useState<PostOffice[]>([]);
    const { setValue } = useFormContext<CreateOrderFormValues>();

    const region = useWatch<CreateOrderFormValues>({ name: 'region' }) as (Region);

    const initOptions = useMemo(() => debounce((value: string) => {
        return getPostOffices(value).then((data) => {
            setPostOffices(data);

            if (data?.length < 20) {
                setLoading(false);
                setOptions(data);
            }
        });
    }, 600), []);

    const initOptionsFromSearch = useMemo(() =>
        debounce((searchValue: string, postOffices: PostOffice[]) => {
            if (searchValue.length > 0) {
                setLoading(false);

                const officesByNumber = postOffices.filter(it => it.name.includes('№' + searchValue));

                if (officesByNumber.length > 0) {
                    setOptions(officesByNumber);
                } else {
                    setOptions(postOffices.filter(it => it.name.includes(searchValue)));
                }
            } else if (searchValue.length === 0) {
                setLoading(false);
                setOptions(postOffices);
            }
        }, 500), []);

    const onSearchFiledChange = (event: any) => {
        setLoading(true);
        setSearchValue(event.target.value)
    }

    useEffect(() => {
        setOptions([]);
        setValue('postOffice', null);
        setSearchValue("");
        setSelectedOffice(null);

        if (region) {
            initOptions(region.id)
        }
    }, [region, initOptions, setOptions, setValue]);


    useEffect(() => {
        initOptionsFromSearch(searchValue, postOffices);
    }, [searchValue, postOffices])

    const inputStyle = {
        width: '80%',
        marginTop: theme.spacing(1)
    };

    return (
        <AutocompleteTextField
            name="postOffice"
            onOptionChanged={setSelectedOffice}
            autocompleteProps={{
                loading : loading,
                loadingText: 'Завантаження...',
                autoHighlight: true,
                value: selectedOffice,
                filterOptions: (options) => options,
                disablePortal: true,
                options: options,
                sx: inputStyle,
                noOptionsText: 'Введіть номер відділення',
                renderOption: (props, option, state, ownerState) => (
                    <Box
                        sx={{
                            borderRadius: '8px',
                            margin: '5px',
                            [`&.${autocompleteClasses.option}`]: {
                                padding: '8px',
                            },
                        }}
                        component="li"
                        {...props}
                    >
                        <AddressComponent address={ownerState.getOptionLabel(option)}/>
                    </Box>
                ),
            }}
            textFieldProps={{
                required: true,
                variant: 'standard',
                label: 'Відділення',
                value: searchValue,
                onChange: onSearchFiledChange,
            }}
        />
    )
}


function AddressComponent({ address }) {
    const match = address.match(/(№\d+)\s(.*)/);

    if (match) {
        const boldNumber = match[1];
        const restOfAddress = match[2];

        return (
            <span>
                <span style={{ fontWeight: 'bold' }}>{boldNumber}</span> {restOfAddress}
            </span>
        );
    } else {
        return address;
    }
}