import styled, { keyframes } from "styled-components";


export const HomeContainer = styled.div`
  width: 100%;
  display: grid;

  align-items:center;
  justify-content:center;
  margin:0;
  height: 100dvh ;
  padding-bottom:200px;



  @media (max-width: 768px) {
    height: calc(100dvh - 100px);
  padding-bottom:80px;

  }

`;
