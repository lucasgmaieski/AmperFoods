import { FiFacebook, FiInstagram } from 'react-icons/fi';
import * as C from './styles';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <C.Container>
            <Link to={'/'}><C.Logo src="/assets/logo-amperfoods-orange-2.png" /></Link>
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