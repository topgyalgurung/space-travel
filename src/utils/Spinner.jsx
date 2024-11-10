import styles from "./Spinner.module.css";
// made spinner reusable by using a functional component

const Spinner = () => {
  return (
    <div className={styles.spinner} data-testid="spinner">
      Loading
      <div className={styles.loadingDots}></div>
    </div>
  );
};

export default Spinner;
