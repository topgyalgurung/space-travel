import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// layouts
import RootLayout from "./routes/RootLayout";
import SpacecraftLayout from "./routes/SpacecraftLayout";

//pages
import Home from "./pages/Home";
import Spacecrafts, { spacecraftLoader } from "./pages/spacecrafts/Spacecrafts";
import Spacecraft, {
  spacecraftDetailsLoader,
} from "./pages/spacecraft/Spacecraft";
import Planets, { planetsLoader } from "./pages/planets/Planets";
import NotFound from "./pages/NotFound";

// components
import Construct, { constructAction } from "./components/construct/Construct";
import SpacecraftError from "./pages/spacecraft/SpacecraftError";

// context

import styles from "./App.module.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    // root layout
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />

      {/* spacecraft layout */}
      <Route
        path="spacecrafts"
        element={<SpacecraftLayout />}
        errorElement={<SpacecraftError />}
      >
        <Route index element={<Spacecrafts />} loader={spacecraftLoader} />
        {/* Route for individual spacecraft details, :id is the URL parameter */}
        <Route
          path=":id"
          element={<Spacecraft />}
          loader={spacecraftDetailsLoader}
        />
        {/* Route for spacecraft construction page within spacecraft layout */}
        <Route
          path="construct"
          element={<Construct />}
          action={constructAction}
        />
      </Route>

      {/* planets layout */}
      <Route path="planets" element={<Planets />} loader={planetsLoader} />
      {/* 404 page */}

      <Route path="* " element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
