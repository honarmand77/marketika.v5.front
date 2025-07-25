import styled from '@emotion/styled';
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  width: 100%;
  padding: 4rem 0;
  position: relative;
  height:100%;
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  gap: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 1rem;
  }
`;

export const AppPreview = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;

`;



export const AppScreenshot = styled.img`
  width: 300px;
  height: 400px;
  object-fit: cover;
  border-radius: 30px;
  transition: transform 0.3s ease;

  z-index:10;

`;

export const FloatingIcon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(255, 160, 92, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 50%;
  color: #FFA05C;
  transition: all 0.3s ease;
  z-index: 50;
  border: 1px solid rgba(255, 255, 255, 0.1);
  left:0;
  top:0;

`;

export const AppInfo = styled.div`
  flex: 1;
  position: relative;
  z-index: 2;
`;

export const GlassMorphism = styled.div`
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
  animation: ${fadeIn} 0.5s ease;
`;

export const Title = styled.h2`
  margin-bottom: 1rem;
  text-align: right;
`;

export const Description = styled.p`
  margin-bottom: 2rem;
  line-height: 1.6;
  text-align: right;
`;

export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: right;
  background: #99999950;

  span {
    font-weight: 500;
  }

  svg {
    color: #FFA05C;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;

export const DownloadButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  z-index:2;
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: none;
  background: linear-gradient(45deg, #FFA05C, #FF7B54);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(255, 160, 92, 0.4);
  }
`;

export const DownloadCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  font-size: 0.9rem;

  svg {
    color: #FFA05C;
  }
`;

export const PhoneFrame = styled.div`
  position: relative;
  border-radius: 40px;
  padding: 20px;
  transform-style: preserve-3d;
`;