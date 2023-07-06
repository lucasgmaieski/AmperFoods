import { OrderItemType } from '../../types/OrderItem';
import * as C from './styles';

type Props ={
    data: OrderItemType;
    onClick: (data: number) => void;
    index: number;
    componenteBRef: any;
}

export const OrderItem = ({data, onClick, index, componenteBRef}: Props) => {

    const handleOpenOrder = () => {
        
        onClick(index);
        componenteBRef.current.scrollIntoView({
            behavior: 'smooth',
          });
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
                <C.Amount>R$ {data.totalPayable.toFixed(2)}</C.Amount>
            </C.LowerArea>
        </C.Container>
    )
}