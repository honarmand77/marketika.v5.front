import styled, { keyframes } from "styled-components";

export const AuthContainer = styled.div`
 width: 100%;
  display: grid;
  align-items:center;
  justify-content:center;
  margin:0;
  height: calc(100dvh - 10px);
  padding-bottom:100px;



  @media (max-width: 768px) {
    height: calc(100dvh - 100px);
  gap: 20px;

  }
`;


export const StepContainer = styled.div`
background:#fff;
  border-radius: 10px;
  padding: 40px;
  width: 100%;
  max-width: 450px;
  z-index: 1;

  span .Mui-active  {
    span{
      color: #ffffff;

    }
  circle{

      color:  #52575D;
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
