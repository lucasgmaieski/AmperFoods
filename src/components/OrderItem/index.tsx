import { OrderItemType } from '../../types/OrderItem';
import { ProdItem } from '../../types/ProdItem';
import * as C from './styles';

type Props ={
    data: OrderItemType;
    onClick: (data: number) => void;
    index: number;
}

export const OrderItem = ({data, onClick, index}: Props) => {
    
    const handleOpenOrder = () => {
        onClick(index);
    }

    return (
        <C.Container onClick={handleOpenOrder}>
            <C.UpperArea>
                <C.Date>{data.date}</C.Date>
                <C.Status>{data.status === 1 && 'Entregue'}</C.Status>
            </C.UpperArea>
            <C.LowerArea>
                <C.Address> 
                    {data.address}
                    {!data.address && 
                    'Você ainda não registrou um endereço.'
                    }
                </C.Address>
                <C.Amount>R$ {data.totalPayable}</C.Amount>
            </C.LowerArea>
        </C.Container>
    )
}