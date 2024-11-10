import styles from "./Planets.module.css";

const SpacecraftCard = ({
  craft,
  planet,
  selectedPlanet,
  onSpacecraftClick,
}) => {
  // Function to handle click events on the spacecraft card
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    if (selectedPlanet) {
      onSpacecraftClick(craft.id); // Trigger spacecraft click handler if a planet is selected
    }
  };

  return (
    <div
      className={`${styles.spacecraft__item} ${
        selectedPlanet && selectedPlanet.id !== planet.id
          ? styles["spacecraft__item--clickable"] // Apply clickable style if a different planet is selected
          : ""
      }`}
      style={{
        borderColor: selectedPlanet === craft.id ? "red" : undefined, // Highlight border if spacecraft is selected
      }}
      onClick={handleClick}
    >
      {craft.pictureUrl ? (
        <img
          className={styles.spacecraft__picture}
          src={craft.pictureUrl}
          alt={craft.name} // Display spacecraft image if available
        />
      ) : (
        <div className={styles.spacecraft__picture}>🚀</div> // Default icon if no image is available
      )}

      <div className={styles.spacecraft__info}>
        {/* Display spacecraft name */}
        <p className={styles.spacecraft__text}>{craft.name}</p>
        {/* Display spacecraft capacity */}
        <p className={styles.spacecraft__text}>
          Capacity: {craft.capacity}
        </p>{" "}
      </div>
    </div>
  );
};

export default SpacecraftCard;
