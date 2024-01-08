import { Alert, Box, Button, useTheme } from '@mui/material';
import { FileUpload as UploadFile } from '@mui/icons-material';
import { Edit as Edit } from '@mui/icons-material';
import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import CheckIcon from '@mui/icons-material/Check';

type FileUploaderProps = {
    fileInfoText: string;
}
export const FileUploader: React.FC<FileUploaderProps> = ({ fileInfoText }) => {
    const theme = useTheme();
    const name = 'approveDocument'
    const { register, watch, formState: { errors } } = useFormContext();
    const registered = register(name);

    const files = watch(name);
    const fieldError = errors[name]?.toString() || '';

    const isFileUploaded = useMemo(() => {
        return files?.length > 0 && !fieldError;
    }, [files, fieldError])


    return (
        <Box style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: theme.spacing(2),
        }}>
            <>
                {!isFileUploaded && <Alert
                    style={{
                        marginTop: theme.spacing(2),
                        marginBottom: theme.spacing(2),
                    }}
                    severity={fieldError ? 'error' : 'warning'}>
                    {fieldError || fileInfoText}
                </Alert>}
                <Button
                    sx={{
                        position: 'relative',
                    }}
                    variant="outlined"
                    endIcon={isFileUploaded ? <Edit/> : <UploadFile/>}
                    component="label">
                    <input {...registered} id="approveDocument" name="approveDocument" type="file" hidden/>
                    {isFileUploaded ? 'Змінити' : 'Завантажити'}
                    {isFileUploaded && <CheckIcon sx={{
                        fontSize: '45px',
                        left: '-50px',
                        color: '#29AB87',
                        position: 'absolute'
                    }}/>}
                </Button>
            </>
        </Box>
    );
}