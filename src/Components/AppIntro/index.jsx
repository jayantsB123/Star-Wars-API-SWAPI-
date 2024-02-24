import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';
import AppIntroGif from './AppIntro.gif';

function AppIntro() {
  return (
    <>
      <section id="app-intro">
        <img src={AppIntroGif} alt="App intro gif" />
        <NavLink to="/planets" className="btn">
          <strong>Planets</strong>
          <div id="container-stars">
            <div id="stars"></div>
          </div>

          <div id="glow">
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </NavLink>
      </section>
    </>
  );
}

export default AppIntro;
