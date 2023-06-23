import * as C from './styles';

type Props = {
    data: {
        id: number,
        title: string,
        image: string,
    },
    activeCategory: number
}

export const CategoryItem = ({data, activeCategory}: Props) => {
    return (
        <C.Container active={activeCategory} id={data.id}>
            <C.CategoryImage src={data.image} />
        </C.Container>
    );
}