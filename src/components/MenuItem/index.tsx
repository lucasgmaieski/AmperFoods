import * as C from './styles';

type Props = {
    icon: string;
    link: string;
}

export const MenuItem = ({icon, link}: Props) => {
    return (
        <C.LinkArea href={link}>
            <C.LinkIcon src={icon}/>
        </C.LinkArea>
    )
}