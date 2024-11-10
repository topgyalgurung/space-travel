import SpacecraftCard from "./SpacecraftCard";
import styles from "./Planets.module.css";

const SpacecraftList = ({
  spacecraft = [],
  planet,
  selectedPlanet,
  onSpacecraftClick,
}) => {
  return (
    <div className={styles.spacecraft}>
      {spacecraft.map((craft) => (
        <SpacecraftCard
          key={craft.id}
          craft={craft}
          planet={planet}
          selectedPlanet={selectedPlanet}
          onSpacecraftClick={onSpacecraftClick}
        />
      ))}
    </div>
  );
};

export default SpacecraftList;
