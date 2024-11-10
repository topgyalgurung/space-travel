import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.css";
const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className={styles.back}
      data-testid="back-button"
      onClick={() => navigate(-1)}
    >
      Back 👈
    </button>
  );
};

export default BackButton;
