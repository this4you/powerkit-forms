import React, { PropsWithChildren, useEffect, useState } from 'react';
import { FormResult } from '../../application/models/FormResult.ts';
import { getIsAvailable } from '../../application/use-cases/getIsAvailable.ts';
import { ResultMessage } from '../../components/result-message/ResultMessage.tsx';
import { Typography } from '@mui/material';
import { ProductType } from '../../application/models/ProductType.ts';


type FormWrapperProps = {
    productType?: ProductType
} & PropsWithChildren;

function scrollUp() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

export const FormWrapper: React.FC<FormWrapperProps> = ({ children, productType }) => {
    const [formResult, setFormResult] = useState<FormResult | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getIsAvailableAsync = async () => {
            const isFormAvailable = await getIsAvailable(productType);

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

        if (productType) {
            getIsAvailableAsync()
        } else {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }

    }, [productType, setLoading, setFormResult]);

    useEffect(() => {
        if (formResult !== null) {
            scrollUp();
        }
    }, [formResult]);

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