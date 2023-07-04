import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    padding: 15px;
`;

export const CategoryArea = styled.div`
    color: #fff;
    margin-top: 20px;
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
    @media (max-width: 660px) {
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
    background-color: ${props=>props.active == props.current ? '#ccc' : '#fff'};
    text-decoration: ${props=>props.active == props.current ? 'underline' : 'none'};
    padding: 5px 10px;
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    cursor: pointer;
    color: #E35319;
    margin-right: 10px;
    transition: all ease .4s;
`;