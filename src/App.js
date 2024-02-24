import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { fetchPlanets } from './utils/api';
import AppIntro from "./Components/AppIntro/index";
import PlanetCards from './Components/Cards';
import PlanetPage from './Components/PlanetPage';
import Loader from "./Components/Loader/Loader"

function App() {
  const [planets, setPlanets] = useState([]);
  const [pageInfo, setPageInfo] = useState({ page: 1, next: null, previous: null });
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (page) => {
    setIsLoading(true);
    try {
      const planetData = await fetchPlanets(page);
      setPageInfo({
        page: page,
        next: planetData.next,
        previous: planetData.previous
      });
      const updatedPlanets = planetData.results.map((planet, index) => ({
        ...planet,
        id: index + 1,
      }));
      setPlanets(updatedPlanets);
    } catch (error) {
      console.error('Error fetching planets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (pageInfo.next) {
      fetchData(pageInfo.page + 1);
    }
  };

  const handlePrevious = () => {
    if (pageInfo.previous) {
      fetchData(pageInfo.page - 1);
    }
  };

  useEffect(() => {
    fetchData(pageInfo.page);
  }, [pageInfo.page]);

  return (
    <Routes>
      <Route path="/" element={<AppIntro />} />
      <Route path="/planets" element={isLoading ? <Loader /> : <PlanetCards planets={planets} handlePrevious={handlePrevious} handleNext={handleNext} />} />
      <Route path="/planets/:id" element={<PlanetPage planets={planets} />} />
    </Routes>
  );
}

export default App;
