import { FiFacebook, FiInstagram } from 'react-icons/fi';
import * as C from './styles';
import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';


export const Header = () => {
    

    return (
        <C.Container>
            <div><C.Logo src="/assets/logo.png" /></div>
            <C.SocialArea>
                <Link to="" title='AmperFoods no Instagram'>
                    <FiInstagram />
                </Link>
                <Link to="" title='AmperFoods no Facebook'>
                    <FiFacebook />
                </Link>
            </C.SocialArea>
        </C.Container>
    )
}