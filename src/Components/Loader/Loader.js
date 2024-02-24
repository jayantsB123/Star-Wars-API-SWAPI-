import React from "react";
import "./Loader.css";
import styled from 'styled-components';

const LoaderContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure this div appears above other content */
`;

const Loader = () => {
  return (
   <LoaderContent>
    <div className="content">
      <div className="planet">
        <div className="ring"></div>
        <div className="cover-ring"></div>
        <div className="spots">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <p>loading</p>
    </div>
   </LoaderContent>
  );
};

export default Loader;
