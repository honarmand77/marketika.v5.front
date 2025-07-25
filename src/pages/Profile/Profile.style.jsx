import styled, { keyframes } from "styled-components";

const slideIn3D = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const ProfileContainer = styled.div`
  gap: 30px;
  width: 100%;
  display: grid;
  overflow:hidden;
  overflow-y: scroll;
  align-items:flex-start;
  justify-content:center;
  margin:0;
  height: calc(100dvh - 100px);
  animation: ${slideIn3D} 1s ease-out;

  &::-webkit-scrollbar {
    width: 5px;
    background: #eee;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffa05c;
  }

  @media (max-width: 768px) {
    height: calc(100dvh - 130px);
  gap: 10px;

  }

`;

