import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    padding: 15px;
`;

export const NoProducts = styled.p`
    color: #fff;
    margin-top: 40px;
    font-weight: 600;
    font-size: 1.6rem;
`;
export const CategoryArea = styled.div`
    color: #fff;
    margin-top: 20px;
    h3 {
        text-shadow: 2px 1px 2px #E35319;
    }
`;

export const CategoryList = styled.div`
    display: flex;
    margin-top: 10px;
`;

export const ProductArea = styled.div`
    margin-top: 25px;
    margin-bottom: 10px;
`;

export const ProductList = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); */
    gap: 15px;
    @media (max-width: 991px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 680px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

export const ProductPaginationArea = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 20px;
`;

export const ProductPaginationItem = styled.div<{active: number, current: number}>`
    background-color: ${props=>props.active == props.current ? '#E35319' : '#fff'};
    text-decoration: ${props=>props.active == props.current ? 'underline' : 'none'};
    padding: 5px 10px;
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    cursor: pointer;
    color: ${props=>props.active == props.current ? '#fff' : '#FA8229' };
    margin-right: 10px;
    transition: all ease .4s;

    &:hover {
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.56);
        background-color: ${props=>props.active == props.current ? '#E35319' : '#f7f7f7'};
    }
`;