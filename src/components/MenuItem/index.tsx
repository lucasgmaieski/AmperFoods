import * as C from './styles';
import { useLocation } from 'react-router-dom';

type Props = {
    icon: string;
    link: string;
    title: string;
}

export const MenuItem = ({icon, link, title}: Props) => {
    const location = useLocation();

    let isActive = location.pathname == link;

    return (
        <C.LinkArea data-tooltip-content={title}  data-tooltip-id="tip-right" to={link} active={isActive.toString()}>
            <C.LinkIcon src={icon}/>
        </C.LinkArea>
    )
}