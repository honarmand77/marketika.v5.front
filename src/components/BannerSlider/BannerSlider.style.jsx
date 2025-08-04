import styled from 'styled-components';

export const BannerContainer = styled.div`

width: 100%;

  margin:0 auto;
  position: relative;
  display:flex;
  align-items:center;
  flex-direction:row;
  justify-content:center;
  padding:5px;
max-height:calc(500px - 10vh + 25vw);
.css-1m9128y{
  display:none;
}


.catswip{
  width:max-content;
height:calc(200px - 10vh + 20vw);
  @media (max-width: 780px){
    width:100vw;
height:max-content;

  }
}
  @media (max-width: 780px){
    width:100vw;
    max-height:calc(500px - 10vh + 10vw);
display:flex;
  flex-direction:column;
}
`



export const Categories_Container = styled.div`
  width:100%;
  display:flex;
  flex-direction:column;
  height:max-content;
    @media (max-width: 780px){
  flex-direction:row;
  height:100%;
  width:max-content;

}
`;

export const CategoryCard = styled.div`
  border-radius: 10px;
  width:100%;
  padding:5px;
  height:max-content;
  display:grid;
    cursor:grab;
  align-items:flex-start;
  transition: transform 0.3s, background-color 0.3s;
  user-select: none;
  max-height:200px;
  &:hover {
    transform: scale(1.05);
  }
  @media (max-width: 780px){
    gap:5px;
  display:grid;
  grid-template-columns:1fr 1fr;
}
`;
