import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchResidents } from '../../utils/api';
import styled from 'styled-components';
import Loader from "../../Components/Loader/Loader";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

// Styled Components
const Card = styled.div`
  padding: 20px;
  border-radius: 15px;
  border: 2px solid #F5F5DC; 
  background-color: black;
  color: #F5F5DC;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  max-width: 600px;
`;

const PlanetInfoCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    text-decoration: underline;
    font-size: 44px;
    text-align: center;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    margin-bottom: 8px;
  }
`;

const ResidentCard = styled(Card)`
  h2 {
    text-decoration: underline;
    text-align: center;
    margin-bottom: 10px;
  }
`;

const ResidentInfo = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 20px;
    margin-bottom: 5px;
  }

  p {
    font-size: 16px;
    margin-bottom: 5px;
  }
`;

const ResidentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-gap: 20px;
  padding: 20px;
  color: #F5F5DC;
  margin: 20px auto;
  max-width: 600px;
`;

const PlanetPage = ({ planets }) => {
  const [planet, setPlanet] = useState(null);
  const [residents, setResidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [init, setInit] = useState(false);

  // Memoized options for particles
  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 150,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  // Callback for particles loaded
  const particlesLoaded = useCallback((container) => {
    console.log(container);
  }, []);

  useEffect(() => {
    let unmounted = false;

    initParticlesEngine(async (engine) => {
      try {
        await loadSlim(engine);
        if (!unmounted) {
          setInit(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error initializing particles:", error);
      }
    });

    const foundPlanet = planets.find((p) => p.name === id);
    setPlanet(foundPlanet);

    if (foundPlanet) {
      const fetchResidentsData = async () => {
        try {
          const residentsData = await fetchResidents(foundPlanet.residents);
          setResidents(residentsData);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching residents:', error);
          setIsLoading(false);
        }
      };

      fetchResidentsData();
    }

    return () => {
      unmounted = true;
    };
  }, [id, planets]);

  if (isLoading) {
    return <Loader />;
  }

  if (!planet) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
      <PlanetInfoCard>
        <h1>{planet.name}</h1>
        <p>Population: {planet.population}</p>
        <p>Rotation Period: {planet.rotation_period}</p>
        <p>Orbital Period: {planet.orbital_period}</p>
        <p>Diameter: {planet.diameter}</p>
        <p>Climate: {planet.climate}</p>
        <p>Gravity: {planet.gravity}</p>
        <p>Terrain: {planet.terrain}</p>
        <p>Surface Water: {planet.surface_water}</p>
      </PlanetInfoCard>
      <ResidentGrid>
        {residents.map((resident) => (
          <ResidentCard key={resident.name}>
            <ResidentInfo>
              <h2>{resident.name}</h2>
              <p>Height: {resident.height}</p>
              <p>Gender: {resident.gender}</p>
              <p>Mass: {resident.mass}</p>
              <p>Hair Color: {resident.hair_color}</p>
              <p>Skin Color: {resident.skin_color}</p>
              <p>Birth Year: {resident.birth_year}</p>
            </ResidentInfo>
          </ResidentCard>
        ))}
      </ResidentGrid>
    </div>
  );
};

export default PlanetPage;
