import styled, { keyframes } from "styled-components";


export const Products_Container = styled.div`
  width: 100%;
  display: grid;
  align-items:flex-start;
  justify-content:center;
  margin:0;
  height: calc(100dvh - 10px);
  padding-bottom:150px;
  z-index:1001;
  @media (max-width: 768px) {
    height: calc(100dvh - 100px);

  }

`;
