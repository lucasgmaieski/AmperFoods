import { ProdItem } from '../../types/ProdItem';
import * as C from './styles';

type Props ={
    data: ProdItem;
    onClick: (data: ProdItem) => void;
}

export const OrderItem = () => {
    
    return (
        <C.Container >
            item
        </C.Container>
    )
}