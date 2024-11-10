import SpacecraftList from "./SpacecraftList";
import styles from "./Planets.module.css";

const PlanetCard = ({
  planet,
  spacecraft,
  selectedPlanet,
  setSelectedPlanet,
  onSpacecraftClick,
}) => {
  // Function to handle click events on the planet card
  const handlePlanetClick = () => {
    // Toggle the selected planet state
    selectedPlanet ? setSelectedPlanet(null) : setSelectedPlanet(planet);
  };

  // Filter spacecrafts that are currently located on the planet
  const planetSpacecraft = spacecraft.filter(
    (craft) => craft.currentLocation === planet.id
  );

  return (
    <div className={styles.planet}>
      <div
        className={`${styles.planet__content} ${
          selectedPlanet?.id === planet.id ? styles["planet--selected"] : ""
        }`}
        onClick={handlePlanetClick}
        style={{
          // Change border color if the planet is selected
          borderColor: selectedPlanet?.id === planet.id ? "red" : undefined,
        }}
      >
        <img
          className={styles.planet__image}
          src={planet.pictureUrl}
          alt={planet.name}
        />
        <div className={styles.planet__info}>
          <h2 className={styles.planet__title}>{planet.name}</h2>
          <h3 className={styles.planet__population}>
            Current population:{" "}
            {Number(planet.currentPopulation).toLocaleString() ?? "Unknown"}
          </h3>
        </div>
      </div>

      <SpacecraftList
        spacecraft={planetSpacecraft}
        planet={planet}
        selectedPlanet={selectedPlanet}
        onSpacecraftClick={onSpacecraftClick}
      />
    </div>
  );
};

export default PlanetCard;
