import { Box, Stack, styled, Tab, Tabs, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DashboardTab, DashboardTabs } from './DashboardTabs.tsx';
import { DashboardModel } from '../application/models/DashboardModel.ts';
import { getDashboard } from '../application/use-cases/getDashboard.ts';

export const ProductsDashboard = () => {
    const [productNumber, setProductNumber] = React.useState(0);
    const [loading, setLoading] = useState(true);
    const [dashboard, setDashboard] = useState<DashboardModel | null>(null);

    useEffect(() => {
        getDashboard().then((result) => {
            setDashboard(result)
        }).finally(() => {
            setLoading(false);
        });
    }, [])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setProductNumber(newValue);
    };

    if (loading || dashboard === null ) {
        return  <h3>Loading..</h3>
    }

    const product = dashboard.productsDashboard[productNumber];

    return (
        <Box sx={{
            width: '80%',
            maxWidth: '600px',
            minHeight: '600px',
            borderRadius: 3,
            paddingBottom: 3
        }}>
            <Box sx={{
                width: '100%',
            }}>
                <DashboardTabs
                    value={productNumber}
                    onChange={handleChange}
                >
                    {
                        dashboard.productsDashboard.map(it => (
                            <DashboardTab label={it.productName} key={it.productCode}/>
                        ))
                    }
                </DashboardTabs>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '100%',
                    color: 'white',
                    marginTop: 3,
                    boxSizing: 'border-box',
                    textAlign: 'center'
                }}>
                    <Box sx={{
                        width: '80%',
                        padding: 2,
                        minHeight: '150px',
                        borderRadius: '20px',
                        border: '4px solid white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}>
                        <Typography variant="subtitle1" sx={{
                            fontWeight: '600'
                        }}>
                            Всього зроблено
                        </Typography>
                        <Typography variant="h1" sx={{
                            fontWeight: '500'
                        }}>
                            {product.finished}
                        </Typography>
                    </Box>
                    <Box sx={{
                        width: '80%',
                        padding: 2,
                        minHeight: '150px',
                        borderRadius: '20px',
                        border: '4px solid white',
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: '20px',
                        textAlign: 'center'
                    }}>
                        <Typography variant="subtitle1" sx={{
                            fontWeight: '600'
                        }}>
                            Потрібно зробити
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginTop: '10px',
                            textAlign: 'center'
                        }}>
                            <Stack spacing={1}>
                                <Typography variant="subtitle2" sx={{
                                    fontWeight: '600'
                                }}>
                                    Безкоштовно
                                </Typography>
                                <Typography variant="h3" sx={{
                                    fontWeight: '600'
                                }}>
                                    {product.verifiedQueue}
                                </Typography>
                            </Stack>
                            <Stack spacing={1}>
                                <Typography variant="subtitle2" sx={{
                                    fontWeight: '600'
                                }}>
                                    За донат
                                </Typography>
                                <Typography variant="h3" sx={{
                                    fontWeight: '600'
                                }}>
                                    {product.verifiedDonate}
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>
                    <Box sx={{
                        width: '80%',
                        padding: 2,
                        minHeight: '150px',
                        borderRadius: '20px',
                        border: '4px solid white',
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: 3,
                        textAlign: 'center'
                    }}>
                        <Typography variant="subtitle1" sx={{
                            fontWeight: '600'
                        }}>
                            Статистика за місяць
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginTop: '10px',
                            textAlign: 'center'
                        }}>
                            <Stack spacing={1}>
                                <Typography variant="subtitle2" sx={{
                                    fontWeight: '600'
                                }}>
                                    Поточний
                                </Typography>
                                <Typography variant="h3" sx={{
                                    fontWeight: '600'
                                }}>
                                    {product.finishedMonth}
                                </Typography>
                            </Stack>
                            <Stack spacing={1}>
                                <Typography variant="subtitle2" sx={{
                                    fontWeight: '600'
                                }}>
                                    Попередній
                                </Typography>
                                <Typography variant="h3" sx={{
                                    fontWeight: '600'
                                }}>
                                    {product.previousMonth}
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>
                    <Box sx={{
                        width: '80%',
                        padding: 2,
                        marginTop: 3,
                        minHeight: '150px',
                        borderRadius: '20px',
                        border: '4px solid white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}>
                        <Typography variant="subtitle1" sx={{
                            fontWeight: '600'
                        }}>
                            Не перевірені
                        </Typography>
                        <Typography variant="h1" sx={{
                            fontWeight: '500'
                        }}>
                            {product.newOrders}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

