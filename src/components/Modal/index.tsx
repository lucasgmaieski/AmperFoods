import * as C from './styles';
import React, { MouseEvent, ReactNode } from 'react';

type Props = {
    children:  ReactNode;
    status: boolean;
    setStatus: React.Dispatch<React.SetStateAction<boolean>>
}
export const Modal = ({children, status, setStatus}: Props) => {
    const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        if (target.classList.contains('modalBg')) {
          setStatus(false);
        }
    }

    return (
        <C.Container 
            className="modalBg"
            status={status.toString()} 
            onClick={handleModalClick}
        >
            <C.ModalBody>
                {children}
            </C.ModalBody>
        </C.Container>
    )
} 