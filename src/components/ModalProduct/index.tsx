import { useState, useEffect } from 'react';
import { ProdItem } from '../../types/ProdItem';
import * as C from './styles';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/reducers/CartReducer';

type Props = {
    data: ProdItem | null;
    setStatus: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalProduct = ({data, setStatus}: Props) => {
    const dispatch = useDispatch();
    const [qt, setQt] = useState(1);

    useEffect(()=> {
        setQt(1);
    }, [data]);

    const handleCancelButton = () => {
        setStatus(false);
    }

    const handleMinusQt = () => {
        if(qt > 1) {
            setQt(qt - 1);
        }
    }

    const handlePlusQt = () => {
        setQt(qt + 1);
    }

    const handleAddToCart = () => {
        dispatch(addProduct({data, qt}
        ));

        setStatus(false);
    }
    return (
        <C.Container>
            <C.ProductArea>
                <C.ProductPhoto src={data?.image} />
                <C.ProductInfoArea>
                    <C.ProductDetails >
                        <C.ProductName>{data?.name}</C.ProductName>
                        <C.ProductCalories>{data?.calories}</C.ProductCalories>
                    </C.ProductDetails>
                    <C.ProductQuantityArea>
                        <C.ProductQuantity>
                            <C.ProductQtImage onClick={handleMinusQt} src="../assets/minus.png"/>
                            <C.ProductQtText>{qt}</C.ProductQtText>
                            <C.ProductQtImage onClick={handlePlusQt} src="../assets/plus.png"/>
                        </C.ProductQuantity>
                        <C.ProductPrice>
                            R$ {((data?.price ?? 1) * qt).toFixed(2)}
                        </C.ProductPrice>
                    </C.ProductQuantityArea>
                </C.ProductInfoArea>
            </C.ProductArea>
            <C.ProductButtons>
                <C.ProductButton small={'true'} onClick={handleCancelButton}>Cancelar</C.ProductButton>
                <C.ProductButton onClick={handleAddToCart}>Adicionar ao Carinho</C.ProductButton>
            </C.ProductButtons>
        </C.Container>
    )
}