import React from "react";
import styled from "styled-components";
import starWarLogo from "./starWar-1.png";
import { NavLink } from 'react-router-dom'

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100; /* Ensure the header is above other elements */
`;

const Logo = styled.img`
  height: 5rem;
  object-fit: contain;
  z-index: 1; /* Ensure the image is above other content within the header */
`;

function Header() {
  return (
    <HeaderContainer>
      <NavLink to={"/"}>
        <Logo src={starWarLogo} alt="StarWar" />
      </NavLink>
    </HeaderContainer>
  );
}

export default Header;
