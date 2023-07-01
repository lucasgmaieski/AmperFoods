import { OrderItemType } from '../../types/OrderItem';
import { ProdItem } from '../../types/ProdItem';
import * as C from './styles';

type Props ={
    data: OrderItemType;
}

export const OrderOpen = ({data}: Props) => {
    
    const handleOpenOrder = () => {
        
    }

    return (
        <C.Container onClick={handleOpenOrder}>
            <C.TimeLineArea>
                <C.TimeLine>
                    <C.Point />
                    <C.Line />
                    <C.Point />
                    <C.Line />
                    <C.Point />
                </C.TimeLine>
                <C.TimeLineDescription>
                    <C.StatusDescription>Pedido Recebido</C.StatusDescription>
                    <C.StatusDescription>Pedido Enviado</C.StatusDescription>
                    <C.StatusDescription>Pedido Entregue</C.StatusDescription>
                </C.TimeLineDescription>
            </C.TimeLineArea>
            
            <C.DetailsArea>
                <C.ProductsArea>
                {data.products.map((item, index)=> (
                    <C.ProductItem key={index}>
                        <C.ProductPhoto src={item.image} />
                        <C.ProductInfoArea>
                            <C.ProductName>{item.name}</C.ProductName>
                            <C.ProductPrice>R$ {item.price.toFixed(2)}</C.ProductPrice>
                        </C.ProductInfoArea>
                    </C.ProductItem>
                    ))}
                </C.ProductsArea>
                <C.InfosArea>
                    <C.Date><span>Data do Pedido</span> <br />{data.date}</C.Date>
                    <C.Address> 
                        {data.address}
                        {!data.address && 
                        'Você ainda não registrou um endereço.'
                        }
                    </C.Address>
                </C.InfosArea>
                <C.ValuesArea>
                    <C.ValuesItem>
                        <span>Produtos</span>
                        <span>R$ {data.amount.toFixed(2)}</span>
                    </C.ValuesItem>
                    <C.ValuesItem>
                        <span>Taxa de entrega</span>
                        <span>R$ {data.delivery.toFixed(2)}</span>
                    </C.ValuesItem>
                    <C.ValuesItem>
                        <span>Desconto</span>
                        <span>R$ {(data.discount*(data.amount+data.delivery)*0.01).toFixed(2)} ({data.discount}%)</span>
                    </C.ValuesItem>
                    <C.ValuesItem>
                        <span>Total</span>
                        <span>R$ {(data.amount + data.delivery - (data.discount*data.amount*0.01)).toFixed(2)}</span>
                    </C.ValuesItem>
                </C.ValuesArea>
                
            </C.DetailsArea>
        </C.Container>
    )
}