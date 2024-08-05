import { FormContainer } from '../components/form-container/FormContainer.tsx';
import { Button, Typography, useTheme } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { FormResult } from '../application/models/FormResult.ts';
import { AppForm, FormTextField } from '../components/commons/form';
import { FileUploader } from '../components/file-uploader/FileUploader.tsx';
import { createReceptionPoint } from '../application/use-cases/createReceptionPoint.ts';
import { CreateReceptionPointFormValidator } from '../application/validators/CreateReceptionPointFormValidator.ts';

type CreateReceptionPointFormProps = {
    setFormResult?: (formResult: FormResult) => void;
}

const fileInfoText = 'Завантажте фото пункту прийому з коробкою для збору цигарок';

const phoneMaskConfig = { mask: '+38 999 999 99 99', maskChar: '*' };

export const CreateReceptionPointForm: React.FC<CreateReceptionPointFormProps> = ({ setFormResult }) => {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const createOrderHandler = useMemo(() => createReceptionPoint(setFormResult, setLoading), [setFormResult]);
    const inputStyle = {
        width: '80%',
        marginTop: theme.spacing(2)
    };

    return (
        <FormContainer isLoading={loading}>
            <Typography variant="h5" sx={{
                textAlign: 'center',
                margin: theme.spacing(4),
                marginBottom: theme.spacing(1),
            }}>
                Додати точку збору використаних електронних цигарок
            </Typography>

            <AppForm
                submit={createOrderHandler}
                formValidator={new CreateReceptionPointFormValidator()}
            >
                <FormTextField
                    required
                    sx={inputStyle}
                    id="name"
                    name="name"
                    label="Ваше імʼя"
                    variant="standard"
                />
                <FormTextField
                    required
                    sx={inputStyle}
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    label="Номер телефону"
                    variant="standard"
                    maskConfig={phoneMaskConfig}
                />
                <FormTextField
                    required
                    sx={inputStyle}
                    id="address"
                    name="address"
                    label="Адреса або посилання на Google Map"
                    variant="standard"
                />
                <FormTextField
                    required
                    sx={inputStyle}
                    id="description"
                    name="description"
                    label="Назва місця де стоїть коробка (кафе, магазин тощо)"
                    variant="standard"
                />
                <FileUploader fileInfoText={fileInfoText}/>
                <Button type="submit"
                        sx={{
                            marginTop: '15px',
                            marginBottom: '15px',
                            width: '80%'
                        }}
                        variant="contained">
                    Додати
                </Button>
            </AppForm>

        </FormContainer>
    );
}
