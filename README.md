# 🚀 Space Travel Project

Welcome to the **Space Travel** project!  
This web application imagines a not-so-distant future where humankind has expanded beyond Earth, colonizing habitable environments across the solar system. Built to aid in humanity’s interplanetary migration, the app allows commanders to manage spacecraft, planets, and interstellar operations.

---

## 🌌 Features

- **Home Page**
  - A welcoming entry point outlining the application’s functionality.

- **Spacecrafts Page**
  - Displays a list of all spacecraft with their details.
  - Provides navigation for:
    - Viewing specific spacecraft information.
    - Constructing new spacecraft.
    - Decommissioning (removing) existing spacecraft.

- **Spacecraft Detail Page**
  - Presents comprehensive information about a single spacecraft.

- **Construction Page**
  - Allows creation of new spacecraft.
  - Includes form validation (name, capacity, description).
  - Navigation back to the previous page.

- **Planets Page**
  - Lists all planets and stationed spacecraft.
  - Enables dispatching spacecraft to different planets (destination must differ from current location).

- **Other Features**
  - Integrated logging to monitor API response times.
  - Redirects all unmatched routes to the homepage.

---



## API 🔌

`/services/SpaceTravelMockApi.js` file, which mimics the back-end. `/services/SpaceTravelApi.js` uses the API. 
In real life, create such a file that uses the `axios` library to use an API. Clear the local storage to start from scratch.

### Data Structures

#### Response

```JavaScript
{
  isError: <boolean>,
  data: <any>
}
```

#### Planet

```JavaScript
{
  id: <int>, // means data type is an integer
  name: <string>,
  currentPopulation: <int>,
  pictureUrl: [<string>] // means optional
}
```

#### Spacecraft

```JavaScript
{
  id: <string>,
  name: <string>,
  capacity: <int>,
  description: <string>,
  pictureUrl: [<string>],
  currentLocation: <int>
}
```
___
### Methods

#### getPlanets

`getPlanets (): Array<planet>`
Fetches all planets.

#### getSpacecrafts

`getSpacecrafts (): Array<spacecraft>`
Fetches all spacecraft.

#### getSpacecraftById

`getSpacecraftById ({id: <string>}): <spacecraft>`
Fetches a spacecraft by its ID.

#### buildSpacecraft

`createSpacecraft ({name: <string>, capacity: <int>, description <string>, pictureUrl: [<string>]}): void // means pictureUrl is optional`
Builds a spacecraft on the Earth by generating an ID.

#### destroySpacecraftById

`destroySpacecraftById ({id: <int>}): void`
Deletes a spacecraft by its ID.

#### sendSpacecraftToPlanet

`sendSpacecraftToPlanet ({spacecraftId: <string>, targetPlanetId: <int>}): void`
Transfer people by sending the spacecraft from its currently located planet to the target planet.

- If the capacity is greater than the current population of the currently located planet, it fills as much as it gets.
- Throws an error if the target planet is the same as the currently located planet.

## Folder Structure

The folder structure designed ensures adherence to best practices:

- `components`: Contains components that are used as building blocks for pages.
- `context`: Contains providers that enable consuming components to subscribe to context changes.
- `pages`: Contains components that are used as a page. Pages are the components used to be rendered by a route.
- `routes`: Contains components that have route rendering logic.
- `services`: Contains services to reach external APIs.

This project employs CSS modules for component-specific styling and embraces the BEM methodology for naming conventions.


🚧 Future Enhancements: 
	•	Add authentication for commanders.
	•	Support spacecraft categories (cargo, passenger, defense).
	•	Enhance UI with animations and 3D visualizations.
	•	Enable multiplayer collaboration.


👨‍🚀 Author: 
	•	Topgyal Gurung (@topgyalgurung)