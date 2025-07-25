import styled, { keyframes } from "styled-components";

const slideIn3D = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const AuthContainer = styled.div`
 width: 100%;
  display: grid;
  align-items:center;
  justify-content:center;
  margin:0;
  height: calc(100dvh - 10px);
  animation: ${slideIn3D} 1s ease-out;
  padding-bottom:100px;



  @media (max-width: 768px) {
    height: calc(100dvh - 130px);
  gap: 20px;

  }
`;


export const StepContainer = styled.div`
background:#fff;
  border-radius: 5px;
  padding: 40px;
  width: 100%;
  max-width: 450px;
  z-index: 1;


  span .Mui-active  {
    span{
      color: #ffffff;

    }
  circle{

      color:  #FF7B54;
      cursor: pointer;
      transition: color 0.3s ease;

      &:hover {
        color: #185a9d;
      }
  }
   text{
      color: #ffffff;

  }
    }
  @media (max-width: 768px) {
    border-radius: 0;
    width: 95vw;

  }
`;
