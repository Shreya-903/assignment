
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainTable from './component/main-table/MainTable';
const theme = createTheme();

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <MainTable />
        </ThemeProvider>
    );
};

export default App;
