import { CatItem } from '../../types/CatItem';
import * as C from './styles';

type Props = {
    data: CatItem;
    activeCategory: number;
    setActiveCategory: React.Dispatch<React.SetStateAction<number>>;
}

export const CategoryItem = ({data, activeCategory, setActiveCategory}: Props) => {
    const handleCategoryClick = () => {
        setActiveCategory(data.id);
    }

    return (
        <C.Container 
            active={activeCategory} 
            ident={data.id} 
            onClick={handleCategoryClick}
            data-tooltip-id="tip-top"
            data-tooltip-content={data.name}
        >
            <C.CategoryImage src={data.image} />
        </C.Container>
    );
}