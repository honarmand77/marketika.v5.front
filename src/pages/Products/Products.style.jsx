import styled, { keyframes } from "styled-components";

// انیمیشن اسلاید سه‌بعدی
const slideIn3D = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Products_Container = styled.div`
  width: 100%;
  display: grid;
  align-items:flex-start;
  justify-content:center;
  margin:0;
  height: calc(100dvh - 10px);
  animation: ${slideIn3D} 1s ease-out;
  padding-bottom:150px;
  z-index:1001;
  @media (max-width: 768px) {
    height: calc(100dvh - 130px);

  }

`;
