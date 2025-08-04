import styled, { keyframes } from 'styled-components';
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const GridContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat( auto-fit, minmax(580px, 1fr) );
  width:100%;
  padding:1vw;
  background:linear-gradient(to top, #52575D10, transparent);
  @media (max-width: 768px) {
padding:0;
grid-template-columns: 1fr;
width:100vw;
gap: 0;

  }
`;

export const SectionContainer = styled.div`
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  height:max-content;
  padding: .5rem .5rem;
  width:100%;
  height:max-content;


  *{
  font-family: "yekan";
  }

  @media (max-width: 1050px) {
  border:none;

  }

@media (max-width: 768px) {
  width:100vw;
  padding: 0;

  }

`;

export const Produc_Container = styled.div`
  width:max-content;
  display:flex;
  height: 100%;
  align-items:center;
  justify-content:center;
  gap:5px;

  @media (max-width: 768px) {
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;

  }

`;
export const Product_Container = styled.div`
  width:100%;
  display:flex;
  height: 100%;
  flex-wrap:wrap;
  align-items:center;
  justify-content:center;
  gap:5px;
  padding:5px;

  @media (max-width: 768px) {
  display:grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
    padding:5px;
  }

`;