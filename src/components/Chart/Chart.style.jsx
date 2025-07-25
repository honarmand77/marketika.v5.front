import styled from "styled-components";


export const ChartContainer = styled.div`
height:100%;
width:100%;
display:flex;
align-items:flex-end;
justify-content:flex-start;
overflow-x:auto;
overflow-y:auto;
position: relative;
user-select: none;
cursor:grab;
gap:0;
padding:5px 15px;
background-image:
      repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%),
      repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%);
    background-size: 75px 50px;
    background-position:center;
@media (max-width: 768px) {


    }
`
export const ChartHeader = styled.div`
color:#FFA05C;
display:flex;
align-items:center;
justify-content:flex-start;
width:100%;
position: absolute;
top:0;
z-index:10;
user-select: none;

@media (max-width: 768px) {


    }
`
export const ChartItems = styled.div`
width:max-content;
height:100%;
display:flex;
align-items:center;
flex-direction:column;
justify-content:flex-end;
transition:1s;
gap:10px;
user-select: none;

h3{
    color:#FFA05C;
    transform:rotate(90deg)
        width:100%;
    text-wrap:nowrap;
}
span{
    width:100px;
    height:0;
    text-align:left;
    border-radius:20px 20px 0 0;
    display:flex;
align-items:center;
justify-content:center;
transition:1s;
position:relative;
transition:.5s;

strong{
    transform:rotate(90deg);
    transition:.5s;
    font-size:130%;
    padding:5px;
    border-radius:5px;

}
&:hover{
    strong{
       transform:scale(1.1);
    transition:.5s;
    background: #FFA05C50;
    padding:5px;
    border-radius:5px;
}
}
}
@media (max-width: 768px) {


    }
`