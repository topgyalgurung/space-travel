import { fn } from "jest-mock";
export const mockResponse = {
  planets: [
    {
      id: 0,
      name: "Mercury",
      population: 100,
      pictureUrl: "https://example.com/mercury.jpg",
    },
    {
      id: 1,
      name: "Venus",
      population: 200,
      pictureUrl: "https://example.com/venus.jpg",
    },
    {
      id: 2,
      name: "Earth",
      population: 100000,
      pictureUrl: "https://example.com/earth.jpg",
    },
  ],
  spacecrafts: [
    {
      id: 1,
      name: "Apollo 11",
      capacity: 10,
      description:
        "Apollo 11 was the spaceflight that landed the first humans on the Moon.",
      pictureUrl: "https://example.com/apollo11.jpg",
      currentLocation: 2,
    },
  ],
};

// Export using ES module syntax
export default {
  get: fn().mockResolvedValue(mockResponse),
};
