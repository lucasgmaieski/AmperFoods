import React from 'react';
import { Navigate, Route, useNavigate } from  'react-router-dom';
import { useAppSelector } from '../redux/hooks/useAppSelector';

type Props = {
    children: JSX.Element
}

export const PrivateRoute = ({children}: Props) => {
    const token = useAppSelector(state => state.persistedReducer.user.token);

    if(token || token !== '') {
        
        return <Navigate to="/login" />;
    }
    return children
}