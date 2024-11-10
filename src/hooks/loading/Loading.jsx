// manage API response times

import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => {
      stopLoading();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return { loading, startLoading, stopLoading };
};

useLoading.defaultProps = {
  isFullScreen: false,
  size: "medium",
};
