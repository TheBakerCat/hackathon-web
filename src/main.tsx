import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ThemeProvider} from "@mui/material";
import {BrowserRouter} from "react-router-dom";
import {RecoilRoot} from "recoil";
import {theme} from "./theme";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <RecoilRoot>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </RecoilRoot>
        </ThemeProvider>
    </React.StrictMode>
)
