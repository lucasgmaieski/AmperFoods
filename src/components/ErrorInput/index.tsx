import * as C from './styles';
import React, { MouseEvent, ReactNode } from 'react';

type Props = {
    message?: string
}
export const ErrorInput = ({message}: Props) => {
    return (
        <C.Container >
            {message}
        </C.Container>
    )
} 