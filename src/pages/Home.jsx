// outlines the application's functionality

import styles from "./Home.module.css";

import Footer from "../utils/Footer";

const Home = () => {
  return (
    <div class={styles.container}>
      <h3 className={styles.container__title}>
        Space Travel: Expanding Horizons Beyond Earth
      </h3>
      <ul className={styles.container__section_list}>
        <li className={styles.container__section}>
          <h3> 🌌 Journey into the Future</h3>
          <p>
            In a world where the impossible has become reality, where the stars
            are no longer out of reach, welcome to the future of humanity's
            survival and exploration. Witness the evolution of technology as it
            transforms barren planets into thriving havens, all made possible by
            the wonders of innovation and human determination.
          </p>
        </li>
        <li className={styles.container__section}>
          <h3> 🌍 From Neglect to Innovation</h3>
          <p>
            Once the cradle of civilization, Earth now stands as a solemn
            reminder of the consequences of neglect and environmental decline.
            But fear not, for the ingenuity of mankind has soared to new
            heights. With our relentless pursuit of advancement, we have not
            only healed our scars but extended our reach across the cosmos.
          </p>
        </li>
        <li className={styles.container__section}>
          <h3> 🚀 Enter Space Travel: Where Dreams Take Flight</h3>
          <p>
            Embark on an extraordinary journey with our groundbreaking web
            application, aptly named "Space Travel." As a commander engineer,
            the fate of humanity's exodus rests in your capable hands. Prepare
            to face the ultimate challenge: evacuating humankind from their
            birthplace and guiding them towards a future among the stars.
          </p>
        </li>
        <li className={styles.container__section}>
          <h3> 🛠️ Engineer, Explorer, Leader</h3>
          <p>
            Space Travel empowers you to engineer, design, and even dismantle
            spacecraft. Craft vessels that defy the boundaries of imagination,
            envisioning a future where life flourishes beyond the stars. But
            remember, your role extends beyond construction – you are a leader,
            an explorer, a commander steering humanity's destiny.
          </p>
        </li>
        <li className={styles.container__section}>
          <h3>🌠 A Universe of Possibilities Awaits</h3>
          <p>
            Immerse yourself in the thrill of exploration as you chart
            interplanetary courses within our solar system. Seamlessly navigate
            your fleet of spacecraft, hurtling through the cosmic void from one
            celestial body to another. The universe becomes your playground, and
            every planet a potential new home.
          </p>
        </li>

        <Footer />
      </ul>
    </div>
  );
};

export default Home;
