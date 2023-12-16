import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { Region } from '../../../../application/models/Region.ts';
import { AutocompleteProps } from '@mui/material/Autocomplete';
import { TextFieldProps } from '@mui/material/TextField/TextField';

export type AutocompleteTextFieldProps = {
    name: string;
    autocompleteProps: Partial<AutocompleteProps<any, any, any, any>>;
    onOptionChanged?: any;
    textFieldProps?: TextFieldProps
};

export const AutocompleteTextField: React.FC<AutocompleteTextFieldProps> = ({ name, onOptionChanged, autocompleteProps, textFieldProps }) => {
    const { formState: { errors }, control} = useFormContext();

    const fieldError = errors[name] as FieldError;

    return <Controller
        render={({ field: {onChange}, ...props }) =>
            <Autocomplete
                options={[]}
                {...autocompleteProps}
                onChange={(e, data) => {
                    onOptionChanged && onOptionChanged(data);
                    onChange(data);
                }}
                getOptionLabel={(option:Region) => option.name}
                renderInput={(params) => <TextField  {...params} error={!!errors[name]} helperText={fieldError?.message} {...textFieldProps}  />}
            />
        }
        name={name}
        control={control}
        defaultValue={{ code: "AF", label: "Afghanistan", phone: "93" }}
    />
}