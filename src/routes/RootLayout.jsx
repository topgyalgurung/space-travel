import { NavLink, Outlet } from "react-router-dom";
import styles from "./RootLayout.module.css";

const RootLayout = () => {
  return (
    <div>
      <header>
        <nav className={styles.nav}>
          {/* Home page */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.nav__link} ${styles["nav__link--active"]}`
                : styles.nav__link
            }
          >
            🌎 Home
          </NavLink>

          {/* Spacecrafts page */}
          <NavLink
            to="spacecrafts"
            end
            className={({ isActive }) =>
              isActive
                ? `${styles.nav__link} ${styles["nav__link--active"]}`
                : styles.nav__link
            }
          >
            🚀 SpaceCrafts
          </NavLink>

          {/* Planets page */}
          <NavLink
            to="planets"
            className={({ isActive }) =>
              isActive
                ? `${styles.nav__link} ${styles["nav__link--active"]}`
                : styles.nav__link
            }
          >
            🪐 Planets
          </NavLink>
        </nav>
      </header>

      <main data-testid="mock-outlet">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
