import { useLoading } from "../../hooks/loading/Loading";
import SpaceTravelApi from "../../services/SpaceTravelApi";

export const useSpacecraftTransfer = ({
  planets,
  setPlanets,
  spacecraft,
  setSpacecraft,
  selectedPlanet,
  setSelectedPlanet,
}) => {
  const { startLoading, stopLoading } = useLoading();

  // Function to handle the transfer of a spacecraft
  const transferSpacecraft = async (spacecraftId) => {
    // Find the selected spacecraft by its ID
    const selectedCraft = spacecraft.find((craft) => craft.id === spacecraftId);
    // Find the source planet where the spacecraft is currently located
    const sourcePlanet = planets.find(
      (p) => p.id === selectedCraft.currentLocation
    );

    // Check if the spacecraft is already at the selected planet
    if (selectedCraft.currentLocation === selectedPlanet.id) {
      alert("Cannot transfer spacecraft to its current location");
      throw new Error("Cannot transfer spacecraft to its current location");
    }

    // Calculate the number of passengers to transfer
    const passengersToTransfer = Math.min(
      Number(sourcePlanet.currentPopulation),
      Number(selectedCraft.capacity)
    );

    // Send the spacecraft to the target planet
    const response = await SpaceTravelApi.sendSpacecraftToPlanet({
      spacecraftId,
      targetPlanetId: selectedPlanet.id,
      passengers: passengersToTransfer,
    });

    // Check for errors in the response
    if (response.isError) {
      throw new Error(response.error || "Transfer failed");
    }

    // Return the number of passengers transferred and the source planet
    return { passengersToTransfer, sourcePlanet };
  };

  // Function to update the game state after a successful transfer
  const updateGameState = async (
    spacecraftId,
    sourcePlanet,
    passengersToTransfer
  ) => {
    // Fetch the updated list of spacecraft
    const updatedResponse = await SpaceTravelApi.getSpacecrafts();
    if (!updatedResponse.isError) {
      // Update the spacecraft state with the new data
      setSpacecraft(updatedResponse.data);

      // Update the planets' populations based on the transfer
      setPlanets((prevPlanets) =>
        prevPlanets.map((planet) => {
          if (planet.id === sourcePlanet.id) {
            // Decrease the population of the source planet
            return {
              ...planet,
              currentPopulation:
                Number(planet.currentPopulation) - passengersToTransfer,
            };
          }
          if (planet.id === selectedPlanet.id) {
            // Increase the population of the target planet
            return {
              ...planet,
              currentPopulation: Math.floor(
                Number(planet.currentPopulation) + passengersToTransfer
              ),
            };
          }
          return planet; // Return the planet unchanged if it's neither the source nor target
        })
      );
    }
  };

  // Main function to handle the spacecraft transfer process
  const handleSpacecraftTransfer = async (spacecraftId) => {
    if (!selectedPlanet) return; // Exit if no planet is selected

    startLoading(); // Start the loading state
    try {
      // Attempt to transfer the spacecraft
      const { passengersToTransfer, sourcePlanet } = await transferSpacecraft(
        spacecraftId
      );
      // Update the game state after a successful transfer
      await updateGameState(spacecraftId, sourcePlanet, passengersToTransfer);
    } catch (error) {
      console.error("Transfer failed:", error); // Log any errors that occur
    }
    stopLoading(); // Stop the loading state
    setSelectedPlanet(null); // Reset the selected planet
  };

  return { handleSpacecraftTransfer }; // Return the transfer handler function
};
