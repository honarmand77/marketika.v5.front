import styled, { keyframes } from "styled-components";


export const SearchContainer = styled.div`
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
