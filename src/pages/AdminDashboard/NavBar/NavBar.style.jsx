import styled from "styled-components";


export const NavBarContainer = styled.div`

position:fixed;
width:80px;
display:flex;
flex-direction:column;
align-items:center;
height:100dvh;
padding-top:70px;
right:0;
top:0;
transition:.5s;
z-index:10000;
background:#fff;
.open{
    display:none;
}
&.open{
    width:250px;
    transition:.5s;
    padding-top:15px;

    background: #FFA05C50;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    .open{
    display:flex;
}
.MenuIcon{
    width:100%;
    justify-content: flex-start;

    strong{
        display:block;
        font-size:150%;
    }

}
.ShortcutButtons{
    width:100%;
    justify-content: flex-start;
    strong{
        display:block;
        font-size:150%;
    }
}
    &.open{
        display:flex;
        align-items:center;
        justify-content:flex-start;
        transition:.5s;
        
    }
}
.ShortcutButtonss{
    display:flex;
    align-items:center;
    flex-direction:column;
    gap:15px;
    justify-content:flex-end;
    height:100%;
}

@media (max-width: 768px) {
    padding:10px;
    padding-top:50px;
        position:fixed;
        width:100%;
        display:flex;
        flex-direction:row;
        align-items:center;
        height:70px;
        right:0;
        bottom:0;
        transition:.5s;
        padding:5px;
        z-index:10000;
        top:unset;
        justify-content:space-evenly;
        .ShortcutButtonss{
    display:flex;
    align-items:center;
    flex-direction:column;
    gap:15px;
    justify-content:flex-end;
    height:max-content;
    width:55px;
    position:absolute;
    left:5px;
    bottom:75px;
}
    }
`
export const IconContainer = styled.div`
display:flex;
width:100%;
height:60px;
align-items:center;
justify-content:center;
padding:10px;
position: relative;
transition:.5s;
gap:10px;
h1{
        display:block;
        font-size:150%;
    }
@media (max-width: 768px) {
    width:60px;
    justify-content:center;


    }
`

export const MenuContainer = styled.div`
display:grid;
align-items:flex-start;
justify-content:center;
gap:15px;

@media (max-width: 768px) {
    width:100%;
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:space-evenly;
        transition:.5s;
.humIcon{
    display:none;
}
    }
`

