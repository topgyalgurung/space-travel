import SpaceTravelMockApi from "./SpaceTravelMockApi.js";

class SpaceTravelApi {
  static async getPlanets() {
    return SpaceTravelMockApi.getPlanets(); // Array <planet>
  }

  static async getSpacecrafts() {
    return SpaceTravelMockApi.getSpacecrafts(); // Array < spacecraft>
  }

  static async getSpacecraftById({ id }) {
    return SpaceTravelMockApi.getSpacecraftById({ id }); // id:string 
  }

  // build spacecraft on earth by generating an id 
  static async buildSpacecraft({ 
    name,
    capacity,
    description,
    pictureUrl = undefined,
  }) {
    return SpaceTravelMockApi.buildSpacecraft({
      name,
      capacity,
      description,
      pictureUrl,  //optional
    });
  }

  static async destroySpacecraftById({ id }) {
    return SpaceTravelMockApi.destroySpacecraftById({ id });
  }

  static async sendSpacecraftToPlanet({ spacecraftId, targetPlanetId }) {
    return SpaceTravelMockApi.sendSpacecraftToPlanet({
      spacecraftId,
      targetPlanetId,
    });
  }
}

export default SpaceTravelApi;
