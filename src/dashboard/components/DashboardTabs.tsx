import React from 'react';
import { styled, Tab, Tabs } from '@mui/material';

interface DashboardTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

interface DashboardTabProps {
    label: string;
}

export const DashboardTabs = styled((props: DashboardTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan"/> }}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 100,
        width: '100%',
        backgroundColor: '#d5d5d5',
    },
});

export const DashboardTab = styled((props: DashboardTabProps) => (
    <Tab disableRipple {...props} />
))(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    width: '50%',
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
        color: '#fff',
    },
    '&.Mui-focusVisible': {
        backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
}));