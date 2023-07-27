import { styled } from "styled-components";

export const Container = styled.div<{status: string, dark: string}>`
    /* position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    background-color: transparent;
    padding: 10px;
    border-radius: 10px;
    /* border: 1px solid green; */
    width: fit-content;
    margin: auto;


    .spinner {
      display: block;
      margin: 0 auto;
      width: 2rem;
      height: 2rem;
      vertical-align: -0.35em;
      border: 0.25em solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      -webkit-animation: .75s linear infinite spinner-border;
      animation: .35s linear infinite spinner-border;
      color: ${props=>props.dark === 'true' ? '#E3531a' : '#fff'};;
    }
    @keyframes spinner-border {
      to { transform: rotate(360deg) }
    }

    .btn-wrapper,
    .btn-text {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .btn-text {
      white-space: nowrap;
      line-height: 50px;
      transition: all 0.2s ease-in-out;
    }

    .add {
      .add-to-cart {
        animation: 0.3s btn-add normal forwards ease;
      }
      
      .btn-text {
        opacity: 0;
        transition: all 0.2s ease-in-out;
      }
      
      .circle {
        animation-delay: 0.2s;
        animation-name: circle-check-loader;
      }

      .check {
        animation-delay: .85s;
        animation-name: check;
      }	
    }

    // Button
    @keyframes btn-add {
      
      80% {
        opacity: 1;
        
      }
      
      95% {
        width: 50px;
        border-radius: 100px;
        background-color: transparent;
      }

      100% {
        opacity: 0;
      }
    }

    .icon-loader-check {
      width: 54px;
      height: 54px;
      position: relative;
      /* top: 50%;
      left: 50%; */
      z-index: 0;
      /* transform: translate(-50%, -50%) rotate(90deg); */
      transform: rotate(90deg);
    }


    .circle {
      stroke-dashArray: 1666, 1650;
      stroke-dashoffset: 2000;
      animation-timing-function: ease;
      animation-fill-mode: forwards;
      animation-duration: 1s;
      animation-delay: 0s;
      //opacity: 0;
    }

    .check {
      stroke-dashArray: 340;
      stroke-dashoffset: 340;
      animation-timing-function: ease;
      animation-fill-mode: forwards; 
      animation-duration: 0.6s;
      animation-delay: 1s;
      //opacity: 0;
    }

    // circle
    @keyframes circle-check-loader {
      0% { 
        stroke-dashArray: 1666, 1650;
        stroke-dashoffset: 2000;
        //opacity: 0;
      }
      
      40% {
      // opacity: 1;
      }

      100% {
        stroke-dashOffset: 3320;
      // opacity: 1;
      }
    }

    // check
    @keyframes check {
      0% { 
        stroke-dashArray: 340;
        stroke-dashoffset: 340;
        opacity: 0;
      }
      
      40% {
        opacity: 1;
      }

      100% {
        stroke-dashOffset: 94;
        opacity: 1;
      }
    }

`;

export const ModalBody = styled.div`
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 0 50px #000;
    max-width: 100vw;
    max-height: 95vh;
    overflow: auto;
`;

export const MessageError = styled.p`
    background-color: #fbe4e4;
    color: red;
    border: 1px solid #ff000040;
    font-size: .9rem;
    padding: 8px 10px;
    border-radius: 10px;
    width: fit-content;
`;
