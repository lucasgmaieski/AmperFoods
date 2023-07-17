import * as C from './styles';
import React, { MouseEvent, ReactNode } from 'react';

type Props = {
    status: boolean;
    isCheck: boolean;
}
export const Loader = ({ status, isCheck}: Props) => {
    return (
        <C.Container status={status.toString()}>
        {isCheck &&
            <div className="btn-wrapper add">
                <svg className="icon-loader-check" x="0px" y="0px" width="471.197px" height="471.197px" viewBox="0 0 510 510" overflow="inherit" preserveAspectRatio="xMidYMid meet">
                    <g id="loader">
                        <circle className="circle" fill="transparent" stroke="#41BD59" strokeWidth="32" strokeLinecap="round" stroke-miterlimit="10" cx="250" cy="250" r="180.599"/>
                        <polyline className="check" fill="none" stroke="#41BD59" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" points="
                    237.599,332.099 300.599,269.099 190.599,159.099 "/>
                    </g>
                </svg>
                <span>Salvo com sucesso!</span>
            </div>
        }
        {!isCheck &&
            <div className="spinner" hidden>
                <span className="visually-hidden"></span>
            </div>
        }


        </C.Container>
    )
} 