import { ProdItem } from '../../types/ProdItem';
import * as C from './styles';

type Props ={
    data: ProdItem;
}

export const ProductItem = ({data}: Props) => {
    return (
        <C.Container>
            <C.ProductPhotoArea>
                <C.ProductPhoto src={data.image} />
            </C.ProductPhotoArea> 

            <C.ProductInfoArea>
                <C.ProductName>{data.name}</C.ProductName>
                <C.ProductPrice>R$ {data.price}</C.ProductPrice>
                <C.ProductIngredients>{data.ingredients}</C.ProductIngredients>
            </C.ProductInfoArea>

            <C.ProductButtonArea>
                <C.ProductButton src="/assets/next-af.png"/>
            </C.ProductButtonArea>
        </C.Container>
    )
}