import styled, { keyframes } from "styled-components";

export const ProfileContainer = styled.div`
  gap: 30px;
  width: 100%;
  display: grid;
  overflow:hidden;
  overflow-y: scroll;
  align-items:center;
  justify-content:center;
  margin:0;
  height: calc(100dvh - 100px);

  &::-webkit-scrollbar {
    width: 5px;
    background: #eee;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffa05c;
  }

  @media (max-width: 768px) {
    height: calc(100dvh - 100px);
  gap: 10px;

  }

`;

