import * as C from './styles';
import { useLocation } from 'react-router-dom';

type Props = {
    icon: string;
    link: string;
}

export const MenuItem = ({icon, link}: Props) => {
    const location = useLocation();

    let isActive = location.pathname == link;

    return (
        <C.LinkArea to={link} active={isActive.toString()}>
            <C.LinkIcon src={icon}/>
        </C.LinkArea>
    )
}