import React from 'react';
import { Navigate } from "react-router";

export const CoverPage = ({ children }) => {
    const auth = localStorage.getItem('user')
    return auth ? <Navigate to="/" /> : children;
};