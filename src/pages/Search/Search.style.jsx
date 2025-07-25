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

export const SearchContainer = styled.div`
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
