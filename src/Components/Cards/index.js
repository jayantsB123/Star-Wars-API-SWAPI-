import React from "react";
import Cards from "./Cards";
import styled from "styled-components";
import Header from "../header/header";

const PlanetContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1rem;
  padding: 0 calc((100vw - 1000px) / 2); // 1000px is the max-width of the container

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Body = styled.div`
  padding: 15rem 0 0 0;
  background-color: #000;
  width: 100%;
  height: calc(100vh - 20rem);
  overflow-x: hidden;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const Button = styled.button`
  width: 150px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  /* New responsive styles */
  @media (max-width: 768px) {
    width: 120px;
    padding: 8px 16px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    width: 100px;
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`;

const VerticalLine = styled.div`
  width: 3px;
  border-radius: 50px;
  height: 50px; /* Adjust height as needed */
  background-color: rgba(255, 255, 255, 0.1);
  margin: 0 10px;

  /* New responsive styles */
  @media (max-width: 768px) {
    height: 40px; /* Adjust height for smaller screens */
  }

  @media (max-width: 480px) {
    height: 30px; /* Further adjust height for even smaller screens */
  }
`;


function PlanetCards({ planets, handlePrevious, handleNext }) {
  return (
    <>
      <Header />
      <Body>
        <PlanetContainer>
          {planets.map((planet, index) => (
            <Cards key={index} planet={planet} />
          ))}
        </PlanetContainer>
        <Pagination>
        <Button onClick={handlePrevious}>Previous </Button>
        <VerticalLine />
        <Button onClick={handleNext}>Next</Button>
        </Pagination>
      </Body>
    </>
  );
}

export default PlanetCards;