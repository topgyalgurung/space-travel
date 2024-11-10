// presents comprehensive info about a particular spacecraft

import { useLoaderData } from "react-router-dom";

import SpaceTravelApi from "../../services/SpaceTravelApi";
import { useLoading } from "../../hooks/loading/Loading";

import Spinner from "../../utils/Spinner";
import BackButton from "../../utils/BackButton";

import styles from "./Spacecraft.module.css";

function SpaceCraftDetails() {
  const spacecraft = useLoaderData();
  const { loading } = useLoading();

  if (loading) return <Spinner />;

  return (
    <div className={styles.spacecraft}>
      <div className={styles.spacecraft__image}>
        {spacecraft.pictureUrl ? (
          <img src={spacecraft.pictureUrl} alt={spacecraft.name} />
        ) : (
          <p className={styles.spacecraft__imagePlaceholder}>🚀</p>
        )}
      </div>
      <div>
        <div className={styles.spacecraft__infoContainer}>
          <div className={styles.spacecraft__nameCapacity}>
            <p>Name:{spacecraft.name}</p>
            <p>
              <span>Capacity: </span> {spacecraft.capacity} passengers
            </p>
          </div>
          <p className={styles.spacecraft__description}>
            <span>Description: </span> {spacecraft.description}
          </p>
        </div>
      </div>
    </div>
  );
}

const Spacecraft = () => {
  return (
    <div className={styles.container}>
      <BackButton />
      <SpaceCraftDetails />
    </div>
  );
};

// loader function
// getSpacecraftById method expects an object with an id property
export const spacecraftDetailsLoader = async ({ params }) => {
  const { id } = params;
  if (!id) {
    throw new Error("No spacecraft ID provided.");
  }
  try {
    const res = await SpaceTravelApi.getSpacecraftById({ id });
    if (res.isError) {
      throw new Error(res.data);
    }
    return res.data;
  } catch (error) {
    throw new Error("Could not fetch spacecraft details");
  }
};

export default Spacecraft;
