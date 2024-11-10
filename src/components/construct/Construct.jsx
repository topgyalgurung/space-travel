// allows navigation back to previous page
// facilitates creation of new spacecraft
// shows errors for missing required fields ( name, capacity, description)

import { Form, useActionData, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLoading } from "../../hooks/loading/Loading";
import BackButton from "../../utils/BackButton";
import Spinner from "../../utils/Spinner";

import SpaceTravelApi from "../../services/SpaceTravelApi";
// import { v4 as uuidv4 } from "uuid";

import styles from "./Construct.module.css";

const Construct = () => {
  const [currentField, setCurrentField] = useState(null);

  //provides the returned value from the previous navigation's action result, or undefined if there was no submission.
  const formData = useActionData();

  const navigate = useNavigate();
  const { loading } = useLoading();

  // Redirects to spacecraft list page when form submission is successful
  useEffect(() => {
    // The ?. optional chaining operator safely accesses success property even if formData is null/undefined
    if (formData?.success) {
      navigate("/spacecrafts");
    }
  }, [formData, navigate]);

  if (loading) return <Spinner />;

  const handleFocus = (fieldName) => {
    setCurrentField(fieldName);
  };

  return (
    <div>
      <div className={styles.container}>
        <BackButton className={styles.back__button} />

        {/* Form a wrapper for the form */}
        <Form
          // post to spacecrafts/construct endpoint
          action="/spacecrafts/construct"
          method="post"
          className={styles.form__container}
        >
          <label className={styles.form__label}>
            {/* input field for name */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              className={styles.form__input}
              // onFocus is called when the input field is focused
              onFocus={() => handleFocus("name")}
              // changes border color to green when the field is focused
              style={currentField === "name" ? { borderColor: "green" } : {}}
            />
          </label>
          <label className={styles.form__label}>
            {/* input field for capacity */}
            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              className={styles.form__input}
              onFocus={() => handleFocus("capacity")}
              style={
                currentField === "capacity" ? { borderColor: "green" } : {}
              }
            />
          </label>
          <label className={styles.form__label}>
            {/* input field for description */}
            <input
              type="text"
              name="description"
              placeholder="Description"
              className={`${styles.form__input} ${styles.form__description}`}
              onFocus={() => handleFocus("description")}
              style={
                currentField === "description" ? { borderColor: "green" } : {}
              }
            />
          </label>
          <label className={styles.form__label}>
            {/* input field for picture url */}
            <input
              type="url"
              name="url"
              placeholder="Picture URL (optional)"
              className={styles.form__input}
              style={currentField === "url" ? { borderColor: "green" } : {}}
              onFocus={() => handleFocus("url")}
            />
          </label>

          <div className={styles.button__container}>
            {/* button to submit form */}
            <button type="submit" className={styles.button}>
              Build
            </button>
          </div>
          {/* Display error message if form submission returns an error */}
          <p className={styles.error}>
            {/* split error message into an array of errors and map over them to display each error on a new line */}
            {formData?.error?.split(", ").map((error, index) => (
              <span key={index} className={styles.error_message}>
                {error}
                {index < formData?.error?.split(", ").length - 1 && <br />}
              </span>
            ))}
          </p>
        </Form>
      </div>
    </div>
  );
};

// action function for form submission
export const constructAction = async ({ request }) => {
  const formData = await request.formData();

  // access individual values
  const submission = {
    name: formData.get("name"),
    capacity: formData.get("capacity"),
    description: formData.get("description"),
    // optional picture url field
    pictureUrl: formData.get("url") || undefined,
  };

  try {
    // validate submission formData
    const errors = [];
    if (submission.name.trim().length < 2) {
      errors.push("Name is required and must be at least 2 characters long");
    }
    if (isNaN(submission.capacity) || submission.capacity < 1) {
      errors.push("Capacity is required and must be a positive number");
    }
    if (!submission.description || submission.description.trim().length < 1) {
      errors.push("Description is required");
    }
    if (errors.length > 0) {
      return { error: errors.join(", ") };
    }

    // make post request to backend API endpoint
    const response = await SpaceTravelApi.buildSpacecraft({
      ...submission,
      // id: uuidv4() api creates id for spacecraft
    });
    if (response.isError) {
      throw new Error(response.formData);
    }

    return { success: true };
  } catch (error) {
    return { error: error.message || "Failed to create spacecraft" };
  }
};

export default Construct;
