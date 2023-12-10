import React, { PropsWithChildren, useEffect, useState } from 'react';
import { FormResult } from '../../application/models/FormResult.ts';
import { getIsAvailable } from '../../application/use-cases/getIsAvailable.ts';
import { ResultMessage } from '../../components/result-message/ResultMessage.tsx';
import { Typography } from '@mui/material';


export const FormWrapper: React.FC<PropsWithChildren> = ({ children }) => {
    const [formResult, setFormResult] = useState<FormResult | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getIsAvailableAsync = async () => {
            const isFormAvailable = await getIsAvailable();

            if (!isFormAvailable.isAvailable) {
                setFormResult({
                    message: isFormAvailable.message,
                    code: '2'
                });
            }
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }

        getIsAvailableAsync()

    }, [setLoading, setFormResult]);

    if (loading) {
        return (
            <Typography
                sx={{
                    color: 'white'
                }}
                variant={'h5'}
            >
                Форма завантажується...
            </Typography>
        );
    }

    if (formResult) {
        return (
            <ResultMessage
                message={formResult.message}
                code={formResult.code}
            />
        );
    }

    return (
        <>
            {React.Children.map(children, (child: React.ReactElement) =>
                React.cloneElement(child, { setFormResult })
            )}
        </>
    );
}