import styled, { keyframes } from "styled-components"

const slideIn3D = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;



export const ProductContainer = styled.div`
  width: 100%;
  display: grid;

  align-items:center;
  justify-content:center;
  margin:0;
  height: calc(100dvh - 10px);
  animation: ${slideIn3D} 1s ease-out;
  padding-bottom:150px;



  @media (max-width: 768px) {
    height: calc(100dvh - 130px);
  padding-bottom:50px;

  }

`

export const ProductHeader = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: right;
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 50px;
    height: 3px;
    background-color: #3498db;
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

export const ProductDescription = styled.p`
  font-size: 1.1rem;
  color: #34495e;
  line-height: 1.8;
  margin-bottom: 30px;
  text-align: right;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

export const ProductImage = styled.img`
  width: 100%;
  max-width: 300px;
  max-height: 300px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`

export const LoadingMessage = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  text-align: center;
  margin-top: 50px;
  animation: ${slideIn3D} 0.5s ease-in;
`

export const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: #e74c3c;
  text-align: center;
  margin-top: 50px;
  animation: ${slideIn3D} 0.5s ease-in;
  padding: 20px;
  background-color: #fadbd8;
  border-radius: 8px;
`

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`

export const ProductPrice = styled.span`
  font-size: 1.8rem;
  font-weight: bold;
  color: #27ae60;
`

export const ProductCategory = styled.span`
  font-size: 1rem;
  color: #ffffff;
  background-color: #3498db;
  padding: 8px 15px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const buttonHover = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0); }
`

export const AddToCartButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 12px 25px;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #c0392b;
    animation: ${buttonHover} 0.3s ease infinite;
  }

  &:active {
    transform: translateY(2px);
  }
`

export const ProductSection = styled.section`
  margin-bottom: 40px;
`

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: right;
`

export const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

export const FeatureItem = styled.li`
  font-size: 1.1rem;
  color: #34495e;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  
  &:before {
    content: '✓';
    color: #27ae60;
    margin-left: 10px;
    font-weight: bold;
  }
`

export const RelatedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
`

export const RelatedProductCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`

export const RelatedProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`

export const RelatedProductInfo = styled.div`
  padding: 15px;
`

export const RelatedProductName = styled.h3`
  font-size: 1rem;
  color: #2c3e50;
  margin-bottom: 5px;
`

export const RelatedProductPrice = styled.span`
  font-size: 0.9rem;
  color: #27ae60;
  font-weight: bold;
`

