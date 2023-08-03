import { ProdItem } from '../../types/ProdItem';
import * as C from './styles';

type Props ={
    data: ProdItem;
    onClick: (data: ProdItem) => void;
}

export const ProductItem = ({data, onClick}: Props) => {
    const handleClick = () => {
        onClick(data);
    }

    return (
        <C.Container onClick={handleClick}>
            <C.ProductPhotoArea>
                <C.ProductPhoto src={data.image} />
            </C.ProductPhotoArea> 

            <C.ProductInfoArea>
                <C.ProductName>{data.name}</C.ProductName>
                <C.ProductPrice>R$ {data.price}</C.ProductPrice>
                <C.ProductCalories>{data.calories} cal</C.ProductCalories>
            </C.ProductInfoArea>

            <C.ProductButtonArea>
                <C.ProductButton src="/public/next-af.png"/>
            </C.ProductButtonArea>
        </C.Container>
    )
}