import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
// import Auth from "../utils/auth";

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  return (
    <div className="container">
      <Link to="/login" className="text-blue-500">
        ← Go to Login
      </Link>

      <div className="container flex justify-center items-center h-screen">
        <div className="my-4">
          <h2 className="text-2xl font-bold">Signup</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col space-y-2 my-2">
              <label htmlFor="username" className="font-semibold">
                Username:
              </label>
              <input
                placeholder="First"
                name="username"
                type="text"
                id="username"
                className="border border-gray-300 px-3 py-2 rounded"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col space-y-2 my-2">
              <label htmlFor="email" className="font-semibold">
                Email:
              </label>
              <input
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                className="border border-gray-300 px-3 py-2 rounded"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-2 my-2">
              <label htmlFor="pwd" className="font-semibold">
                Password:
              </label>
              <input
                placeholder="******"
                name="password"
                type="password"
                id="pwd"
                className="border border-gray-300 px-3 py-2 rounded"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
