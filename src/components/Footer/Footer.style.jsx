import styled, { css } from "styled-components";

export const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  color: white;
  z-index: 1000;
  transform: translateY(100%);
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  will-change: transform, opacity;
  -webkit-backdrop-filter: blur(20px) saturate(100%);
  backdrop-filter: blur(20px) saturate(100%);
  background-color: #ffffff50;
  
  &.visible {
    transform: translateY(0);
    opacity: 1;
    border-radius: 10px 10px 0 0;
    animation: floatUp 0.5s ease-out;
  }
    
  &.hidden {
    transform: translateY(100%);
    opacity: 0;
  }

  @keyframes floatUp {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .Footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 15px;
    gap: 20px;
  }

  .footer-tools {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
  }

  .footer-tool {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: linear-gradient(45deg, #FFA05C, #FF7B54);
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 140px;
    position: relative;
    overflow: hidden;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(255, 123, 84, 0.4);
      &::after {
        opacity: 1;
      }
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0));
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .MuiSvgIcon-root {
      font-size: 20px;
      transition: transform 0.3s ease;
    }

    &:hover .MuiSvgIcon-root {
      transform: scale(1.1);
    }
  }

  .footer-links {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 25px;
    padding: 15px 0;

    a {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #FF7B54;
      text-decoration: none;
      transition: all 0.3s ease;
      position: relative;
      padding: 5px 0;
      
      &:hover {
        color: #FF5E62;
        transform: translateY(-2px);
        
        &::after {
          width: 100%;
        }
      }
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: #FF5E62;
        transition: width 0.3s ease;
      }

      .MuiSvgIcon-root {
        font-size: 20px;
      }
    }
  }

  .footer-social {
    display: flex;
    justify-content: center;
    gap: 25px;
    margin-top: 10px;

    a {
      color: #555;
      transition: all 0.3s ease;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      
      &:hover {
        transform: translateY(-5px) scale(1.1);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        
        &:nth-child(1) { /* Instagram */
          background: linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D);
          color: white;
        }
        &:nth-child(2) { /* Telegram */
          background: #0088cc;
          color: white;
        }
        &:nth-child(3) { /* WhatsApp */
          background: #25D366;
          color: white;
        }
      }

      .MuiSvgIcon-root {
        font-size: 22px;
      }
    }
  }

  @media (max-width: 768px) {
    .footer-tools {
      gap: 10px;
    }
    
    .footer-tool {
      min-width: 120px;
      padding: 10px 15px;
      font-size: 0.9rem;
    }
    
    .footer-links {
      gap: 15px;
    }
  }
`;