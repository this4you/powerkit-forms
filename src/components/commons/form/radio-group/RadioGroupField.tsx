import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { RadioGroupProps } from '@mui/material/RadioGroup';
import { Controller, useFormContext } from 'react-hook-form';

type RadioGroupFieldProps = {
    name: string;
    label?: string;
    items: RadioGroupItem[];
} & RadioGroupProps;

type RadioGroupItem = {
    value: string;
    label: string;
};

export const RadioGroupField: React.FC<RadioGroupFieldProps> = ({ name, label, items, ...rest }) => {
    const { control } = useFormContext();

    return (
        <FormControl component="fieldset">
            {label && <FormLabel component="legend">{label}</FormLabel>}
            <Controller
                rules={{ required: true }}
                control={control}
                name={name}
                render={({ field }) => (
                    <RadioGroup {...rest} {...field} row>
                        {items.map(it => (
                            <FormControlLabel
                                value={it.value}
                                control={<Radio/>}
                                label={it.label}
                            />
                        ))}
                    </RadioGroup>
                )}
            />
        </FormControl>
    );
}