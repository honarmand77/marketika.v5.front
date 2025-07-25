import styled from 'styled-components';


export const Swipers_Container  = styled.div`
display:flex;
align-items:center;
  overflow-x:scroll;
  position:relative;
  overflow:hidden;
  width:100vw;
  height: max-content;
  gap: 10px;
  z-index:10;
margin:auto;
border-radius: 0 0 10px 10px;
padding:10px;
scroll-snap-type: x mandatory;
scroll-behavior: smooth;
&::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 780px){

}
`;