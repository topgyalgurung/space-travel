import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useLoading } from "../../hooks/loading/Loading";
import Spinner from "../../utils/Spinner";
import Footer from "../../utils/Footer";
import PlanetCard from "./PlanetCard";
import { useSpacecraftTransfer } from "./useSpacecraftTransfer";
import SpaceTravelApi from "../../services/SpaceTravelApi";
import styles from "./Planets.module.css";

const Planets = () => {
  // Destructure initial data for planets and spacecraft from loader
  const { planets: initialPlanets, spacecraft: initialSpacecraft } =
    useLoaderData();

  // State to manage planets and spacecraft data
  const [planets, setPlanets] = useState(initialPlanets);
  const [spacecraft, setSpacecraft] = useState(initialSpacecraft);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  // Custom hook to manage loading state
  const { loading } = useLoading();

  // Custom hook to handle spacecraft transfer logic
  const { handleSpacecraftTransfer } = useSpacecraftTransfer({
    planets,
    setPlanets,
    spacecraft,
    setSpacecraft,
    selectedPlanet,
    setSelectedPlanet,
  });

  // Show spinner while loading
  if (loading) return <Spinner />;

  return (
    <div className={styles.planets}>
      {/* Render a card for each planet */}
      {planets?.map((planet) => (
        <PlanetCard
          key={planet.id}
          planet={planet}
          spacecraft={spacecraft}
          selectedPlanet={selectedPlanet}
          setSelectedPlanet={setSelectedPlanet}
          onSpacecraftClick={handleSpacecraftTransfer}
        />
      ))}
      <Footer />
    </div>
  );
};

// Loader function to fetch both planets and spacecraft data
export const planetsLoader = async () => {
  try {
    // Fetch planets and spacecraft data concurrently using Promise.all
    const [planetsResponse, spacecraftResponse] = await Promise.all([
      SpaceTravelApi.getPlanets(),
      SpaceTravelApi.getSpacecrafts(),
    ]);

    // Check for errors in the planets response
    if (planetsResponse.isError) {
      throw new Error("Failed to fetch planets");
    }

    // Check for errors in the spacecraft response
    if (spacecraftResponse.isError) {
      throw new Error("Failed to fetch spacecraft");
    }

    // Return the fetched data
    return {
      planets: planetsResponse.data,
      spacecraft: spacecraftResponse.data,
    };
  } catch (error) {
    // Handle any errors that occur during data fetching
    throw new Error("Could not load planet and spacecraft data");
  }
};

export default Planets;
