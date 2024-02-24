import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  max-width: 20em;
  position: relative;
  height: 3.5em;
  border: 3px ridge #149CEA;
  outline: none;
  background-color: transparent;
  color: white;
  transition: 1s;
  border-radius: 0.3em;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    top: -10px;
    left: 3%;
    width: 95%;
    height: 40%;
    background-color: #000;
    transition: 0.5s;
    transform-origin: center;
  }

  &::before {
    content: "";
    transform-origin: center;
    position: absolute;
    top: 80%;
    left: 3%;
    width: 95%;
    height: 40%;
    background-color: #000;
    transition: 0.5s;
  }

  &:hover::before, &:hover::after {
    transform: scale(0)
  }

  &:hover {
    box-shadow: inset 0px 0px 25px #1479EA;
  }

  @media (min-width: 768px) {
    width: 100%;
    max-width: 20em;
  }

  @media (min-width: 1024px) {
    width: 100%;
    max-width: 20em;
  }

  @media (min-width: 1200px) {
    width: 100%;
    max-width: 25em;
  }
`;


function Buttons({ planet }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/planets/${planet.name}`);
  };

  return (
    <div>
      <Button onClick={handleClick} planet={planet}>{planet.name}</Button>
    </div>
  );
}

export default Buttons;