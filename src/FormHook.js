import React from "react";
import { useForm } from "react-hook-form";
import "./styles.css";
import firebase, { todosRef } from "./firebase";

function writeUserData(data) {
  firebase
    .database()
    .ref("users/" + 1)
    .push({
      ...data,
      robbie: new Date()
    });
}

function FormValidate() {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearError,
    formState: { isSubmitting }
  } = useForm();
  const onSubmit = data => {
    writeUserData(data);
    console.log(data);
  };
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const validateUserName = async value => {
    await sleep(1000);
    if (value !== "bill") {
      setError("username", "validate");
    } else {
      clearError("username");
    }
  };
  return (
    <form className="App" onSubmit={handleSubmit(onSubmit)}>
      <h1>Your Quest Idea!</h1>
      <label>First Name:</label>
      <input
        name="firstName"
        ref={register({ required: true })}
        id="firstName"
      />

      <label>Last Name:</label>
      <input
        name="lastName"
        ref={register({ required: true, minLength: 2 })}
        id="lastName"
      />

      <label>Email</label>
      <input
        name="email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        id="email"
      />
      <label>Quest Idea</label>
      <textarea name="idea" ref={register} />
      <input disabled={isSubmitting} type="submit" id="idea" />
    </form>
  );
}

export default FormValidate;
