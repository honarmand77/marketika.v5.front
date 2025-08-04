import styled from '@emotion/styled';
import { keyframes } from "@emotion/react";

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const Container = styled.section`
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #52575D10 0%, #52575D10 50%);
	/*min-height: calc(100vh - 2rem);*/
	display: flex;
	flex-direction: column;
	align-items: stretch;
	justify-content: space-evenly;
	position: relative; 


::before, 
::after {
	content: "";
	width: 70vmax;
	height: 70vmax;
	position: absolute;
	background: #aaaaaa10;
	left: -20vmin;
	top: -20vmin;
	animation: morph 15s linear infinite alternate, spin 20s linear infinite;
	z-index: 1;
	will-change: border-radius, transform;
	transform-origin: 55% 55%;
	pointer-events: none; 
}
	
::after {
    width: 70vmin;
    height: 70vmin;
    left: auto;
    right: -10vmin;
    top: auto;
    bottom: 0;
    animation: morph 10s linear infinite alternate, spin 26s linear infinite reverse;
    transform-origin: 20% 20%; 
}

@-webkit-keyframes Gradient {
	0% {
		background-position: 0 50%
	}
	50% {
		background-position: 100% 50%
	}
	100% {
		background-position: 0 50%
	}
}

@-moz-keyframes Gradient {
	0% {
		background-position: 0 50%
	}
	50% {
		background-position: 100% 50%
	}
	100% {
		background-position: 0 50%
	}
}

@keyframes Gradient {
	0% {
		background-position: 0 50%
	}
	50% {
		background-position: 100% 50%
	}
	100% {
		background-position: 0 50%
	}
}

@keyframes morph {
  0% {
    border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%; }
  100% {
    border-radius: 40% 60%; } 
}

@keyframes spin {
  to {
    transform: rotate(1turn); 
  } 
}
	.st0{display:none;}
	.st1{display:inline;}
	.st2{opacity:0.29;}
	.st3{fill:#FFFFFF;}
	.st4{clip-path:url(#SVGID_2_);fill:#FFFFFF;}
	.st5{clip-path:url(#SVGID_4_);}
	.st6{clip-path:url(#SVGID_6_);}
	.st7{clip-path:url(#SVGID_8_);}
	.st8{clip-path:url(#SVGID_10_);}
	.st9{fill:none;}
	.st10{clip-path:url(#SVGID_12_);}
	.st11{opacity:0.7;}
	.st12{clip-path:url(#SVGID_14_);}
	.st13{opacity:0.2;}
	.st14{clip-path:url(#SVGID_16_);}
	.st15{opacity:0.3;fill:#FFFFFF;enable-background:new    ;}
  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
	z-index: 2;

  @media (min-width: 992px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 4rem;
  }
`;



export const AppInfo = styled.div`
  flex: 1;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #2d3748;
  line-height: 1.3;
  text-align: right;

  @media (min-width: 768px) {
    font-size: 2.2rem;
    text-align: right;
  }
`;

export const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #4a5568;
  margin-bottom: 1.5rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 1.1rem;
    text-align: right;
  }
`;

export const FeatureHighlight = styled.div`
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  justify-self:center;
  width:100%;
  max-width:300px;

  h4 {
    font-size: 1.2rem;
    margin: 1rem 0 0.5rem;
    color: #2d3748;
    text-align: center;
  }

  p {
    margin: 0;
    color: #4a5568;
    line-height: 1.6;
    text-align: center;
  }

  svg {
    display: block;
    margin: 0 auto;
    color: #52575D;
    font-size: 2.5rem;
  }

  @media (min-width: 768px) {
    h4, p {
      text-align: right;
    }

    svg {
      margin: 0;
    }
  }
`;

export const FeatureList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin: 1.5rem 0;
  justify-content: center;
justify-self:right;
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

export const FeatureItem = styled.div`
  flex: 1 1 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.active ? 'rgba(66, 153, 225, 0.1)' : 'transparent'};
  border: 1px solid ${props => props.active ? 'rgba(66, 153, 225, 0.3)' : 'rgba(0, 0, 0, 0.1)'};
  min-width: 120px;

  &:hover {
    background: rgba(66, 153, 225, 0.1);
  }

  svg {
    color: ${props => props.active ? '#52575D' : '#718096'};
    margin-bottom: 0.5rem;
  }

  span {
    font-size: 0.9rem;
    color: ${props => props.active ? '#2d3748' : '#718096'};
    text-align: center;
  }
`;

export const DownloadButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;
  justify-content: center;
justify-self:flex-start;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

export const DownloadButton = styled.button`
  flex: 1 1 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 8px;
  border: none;
  background: #52575D90;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${props => props.isCounting ? pulse : 'none'} 0.5s ease;
  min-width: 200px;

  &:hover {
    background: #1a202c;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const DownloadCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  font-size: 0.9rem;
  justify-content: center;

  svg {
    color: #52575D;
    animation: ${pulse} 2s infinite;
  }

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;