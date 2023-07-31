import { styled } from "styled-components";

export const Container = styled.div`
    background-color: #fff;
    display: flex;
    flex-direction: column; 
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    padding: 15px;
    color: #E35319;
    cursor: pointer;
    margin: 20px 0;
    transition: all ease .4s;

    &:hover {
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.56);
        background-color: #f7f7f7;
    }
`;
export const TimeLineArea = styled.div`
    width: 100%;
    margin: 10px 0 20px;
`;
export const TimeLine = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;
export const Point = styled.div`
    width: 20px;
    height: 20px;
    background-color: #E35319;
    border-radius: 50%;
`;
export const Line = styled.div`
    flex: 1;
    width: 2px;
    height: 2px;
    background-color: #E35319;
`;
export const TimeLineDescription = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;
export const StatusDescription = styled.div`
    &:nth-child(2) {
        text-align: center;
    }
    &:nth-child(3) {
        text-align: end;
    }
`;
export const DetailsArea = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 10px;
    width: 100%;
    margin-bottom: 10px;
`;
export const ProductsArea = styled.div`
    flex: 1;
`;
export const ProductItem = styled.div`
    display: flex;
    margin: 10px 0;
`;
export const ProductPhoto = styled.img`
    width: 64px;
    height: auto;
    border-radius: 5px;
`;
export const ProductInfoArea = styled.div`
    flex: 1;
    margin-left: 10px;
`;
export const ProductName = styled.div`
    font-size: 14px;
    font-weight: bold;
`;
export const ProductPrice = styled.div`
    font-size: 13px;
`;
export const InfosArea = styled.div`
   flex: 1;
`;
export const ValuesArea = styled.div` 
    margin: 10px 0 14px;
    flex: 1;
`;
export const ValuesItem = styled.div` 
    display: flex;
    justify-content: space-between;
    margin-bottom: 3px;
    font-size: 14px;
    font-weight: bold;
    width: 180px;
    margin-left: auto;
    @media(max-width:768px) {
        margin-left: 0;
    }
`;
export const Date = styled.div`
    max-width: 250px;
    margin: auto;
    span {
        font-weight: bold;
    }
    @media(max-width:600px) {
        margin: 0;
    }
`;
export const Address = styled.div`
    max-width: 250px;
    margin: auto;
    margin-top: 7px;
    @media(max-width:600px) {
        margin: 0;
    }
`;
export const Status = styled.div`

`;
export const LowerArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;
export const Amount = styled.div`

`;
