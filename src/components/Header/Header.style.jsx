import styled from "styled-components";




export const HeaderContainer = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
position: relative;
transition:.5s;
z-index:999;
width:100vw;
padding:5px;
top:0;
-webkit-backdrop-filter: blur(20px);
backdrop-filter: blur(20px);
background:#fff;
@media (max-width: 768px) {
    width:100%;
    justify-content:space-between;


    }
`
export const ButtonContainer = styled.div`
display:flex;
align-items:center;
justify-content:flex-end;
padding:5px;
position: relative;

&>:last-child{
background:transparent;
border:none;

&:hover{
background:transparent;
transform:scale(1.2);
border:none;
color: #444;

}
}
.dark &>:last-child{
background:transparent;
border:none;
color:#444;

&:hover{
background:transparent;
transform:scale(1.2);

}
}
@media (max-width: 768px) {

position:fixed;
top: calc(100dvh - 60px);
width:calc(100% - 10px);
justify-content:space-between;
padding:0 10px;
&>:last-child{
position:fixed;
top: 2px;
left: 2px;

}
    }
`
export const IconContainer = styled.div`
display:flex;
align-items:center;
justify-content:center;
padding:5px;
position: relative;
transition:.5s;
gap:10px;

h1{
        display:block;
        font-size:150%;
 

    }
@media (max-width: 768px) {

    justify-content:center;
    gap:5px;
    padding:0;


    }
`

export const ProfileIconContainer = styled.div`
display:grid;
align-items:center;
justify-content:center;
position: relative;
transition:.5s;
height:48px;
overflow:hidden;
z-index:999;

&:hover{
    overflow: visible;
    .logout{
    height:100px;
    background:#99999940;
    padding:5px 0;
}
}
.logout{
    height:50px;
    display:grid;
    align-items:center;
justify-content:center;
}
@media (max-width: 768px) {
    width:50px;
    justify-content:flex-end;
    &:hover{
    overflow: visible;
    width:100px;

    .logout{
    height:50px;
    background:#99999940;
    padding:5px 0;

}
}
.logout{
    height:50px;
    display:flex;
    flex-direction: row-reverse;
        align-items:center;
justify-content:center;
}
}
`


export const SearchContainer = styled.div`
  flex: 1;
  max-width: 400px;
  margin: 0 55px;
  transition: all 0.3s ease;
  
  ${({ isFocused }) => isFocused && `
    max-width: 500px;
  `}
  
  @media (max-width: 768px) {
    max-width: 200px;
    ${({ isFocused }) => isFocused && `
    max-width: 250px;
  `}
  }
`;