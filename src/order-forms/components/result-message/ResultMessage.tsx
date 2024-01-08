import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

type ResultMessageProps = {
    message: string,
    code: string
}
export const ResultMessage: React.FC<ResultMessageProps> = ({ message, code }) => {
    const formResultConfig = getResultConfig(code);
    const theme = useTheme();

    return (
        <>
            <Paper elevation={3} sx={{
                borderRadius: '20px',
                width: '95vw',
                maxWidth: '600px',
                minHeight: '300px',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <Box sx={{
                    color: 'white',
                    borderTopRightRadius: '20px',
                    borderTopLeftRadius: '20px',
                    width: '100%',
                    height: '150px',
                    backgroundColor: formResultConfig.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        width: '320px'
                    }}>
                        {formResultConfig.icon}

                        <Typography variant="h5">
                            {formResultConfig.title}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: '150px',
                    boxSizing: 'border-box',
                    padding: theme.spacing(3)
                }}>
                    <Typography variant="body1">
                        {message}
                    </Typography>
                </Box>
            </Paper>
        </>
    );
}

function getResultConfig(code: string): FormResultConfig {
    switch (code) {
        case '0':
            return {
                color: '#FF6347',
                title: 'Замовлення відхилено',
                icon: <ErrorIcon sx={{
                    fontSize: '60px',
                }}/>
            }
        case '1':
            return {
                color: '#29AB87',
                title: 'Замовлення прийнято!',
                icon: <CheckIcon sx={{
                    fontSize: '60px',
                }}/>
            }
        case '2':
            return {
                color: '#296aab',
                title: 'Форма зараз не доступна',
                icon: <InfoIcon sx={{
                    fontSize: '60px',
                }}/>
            }
        case '-1':
            return {
                color: '#296aab',
                title: 'На жаль, сталась помилка',
                icon: <ErrorIcon sx={{
                    fontSize: '60px',
                }}/>
            }
    }
}

type FormResultConfig = {
    icon: JSX.Element,
    title: string,
    color: string
}