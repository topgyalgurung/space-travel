// displays all spacecraft and their details
// provides navigation options for viewing specific spacecraft details
import { useState, useEffect } from "react";
import { useLoaderData, Link, NavLink } from "react-router-dom";

import { useLoading } from "../../hooks/loading/Loading";
import SpaceTravelApi from "../../services/SpaceTravelApi";
//utils
import Footer from "../../utils/Footer";
import Spinner from "../../utils/Spinner";

import styles from "./Spacecrafts.module.css";

function BuildSpacecraft() {
  return (
    <nav className={styles.built_button}>
      {/* navigate to construct relative link. /spacecrafts/construct */}
      <NavLink to="construct"> 🛠️ Build a Spacecraft</NavLink>
    </nav>
  );
}

function DisplaySpacecrafts() {
  const initialSpacecrafts = useLoaderData();
  // State to manage the list of spacecrafts, initialized with data from the loader
  const [spacecrafts, setSpacecrafts] = useState(initialSpacecrafts);
  // loading hook
  const { loading, startLoading, stopLoading } = useLoading();
  // handle loading state
  if (loading) {
    return <Spinner />;
  }

  // Function to handle spacecraft destruction
  const handleDestroy = async ({ spacecraftId }) => {
    startLoading();
    try {
      // Make API call to delete spacecraft with given ID
      const response = await SpaceTravelApi.destroySpacecraftById({
        id: spacecraftId,
      });

      if (!response.isError) {
        // Update state by filtering out the destroyed spacecraft
        setSpacecrafts(
          spacecrafts.filter((craft) => craft.id !== spacecraftId)
        );
      }
    } catch (error) {
      // Log any errors that occur during destruction
      console.error("Failed to destroy spacecraft:", error);
    } finally {
      // Always stop the loading state when operation completes
      stopLoading();
    }
  };
  return (
    <div className={styles.spacecrafts}>
      {spacecrafts.map((spacecraft) => (
        <div key={spacecraft.id} className={styles["spacecrafts__info"]}>
          <div className={styles["spacecrafts__image"]}>
            <Link to={`/spacecrafts/${spacecraft.id}`}>
              {spacecraft.pictureUrl ? (
                <img src={spacecraft.pictureUrl} alt={spacecraft.name} />
              ) : (
                <p className={styles["spacecrafts__image-icon"]}>🚀</p>
              )}
            </Link>
          </div>
          <div>
            <p>Name: {spacecraft.name}</p>
            <p>Capacity: {spacecraft.capacity}</p>
          </div>
          <button
            className={styles["spacecrafts__destroy-button"]}
            onClick={() => handleDestroy({ spacecraftId: spacecraft.id })}
          >
            🔥 Destroy
          </button>
        </div>
      ))}
    </div>
  );
}

const Spacecrafts = () => {
  return (
    <div className={styles.container}>
      {/* build spacecraft button */}
      <BuildSpacecraft />
      {/* display all spacecrafts */}
      <DisplaySpacecrafts />
      <Footer />
    </div>
  );
};

// loader function
export const spacecraftLoader = async () => {
  try {
    const res = await SpaceTravelApi.getSpacecrafts();
    if (res.isError) {
      throw new Error(res.data);
    }
    console.log("spacecrafts", res.data); // Array<spacecraft>
    return res.data;
  } catch (error) {
    throw new Error("Could not fetch spacecraft data");
  }
};

export default Spacecrafts;
