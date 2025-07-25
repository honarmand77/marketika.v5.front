import styled from "styled-components"


export const AdminDashboardContainer = styled.div`
padding-right:80px;
position:relative;
width:100%;
  display: grid;
  align-items:flex-start;
  justify-content:center;
  margin:0;
  height: calc(100dvh - 10px);
  padding-bottom:100px;
  
@media (max-width: 768px){
    padding-right:0px;
    padding-bottom:70px;
  height: calc(100dvh - 130px);

}
`