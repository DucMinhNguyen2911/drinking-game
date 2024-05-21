import { useEffect, useState } from 'react';
import { fetchWrapper } from '../_helpers';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
//import { userActions } from '_store';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
export { Home };

function Home() {
    document.title = "Drinking Game";
    const defaultTheme = createTheme();
    return (
        <>
        
        </>
    );
}
