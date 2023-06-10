import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", username: "", password: "" });
  const [addUser, {error, data}] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log('ERROR', error);
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      console.log(data.addUser.user)
      Auth.login(data.addUser);
    } catch (e) {
      console.error("ERROR:", e);
    }

  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  return (
    <div className="container mx-auto">
      <div className="flex justify-end my-4">
        <Link to="/login" className="text-blue-500">
          ← Go to Login
        </Link>
      </div>

      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md  border border-gray-300 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-center">Signup</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block font-semibold mb-2">
                Username:
              </label>
              <div className="user-wrapper">
                <input
                placeholder="First"
                name="username"
                type="text"
                id="username"
                className="pl-6 border border-gray-300 px-3 py-2 rounded w-full"
                onChange={handleChange}
              />
              </div>
              
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold mb-2">
                Email:
              </label>
              <div className="email-wrapper">
                <input
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                className="pl-6 border border-gray-300 px-3 py-2 rounded w-full"
                onChange={handleChange}
              />
              </div>
              
            </div>

            <div className="mb-6">
              <label htmlFor="pwd" className="block font-semibold mb-2">
                Password:
              </label>
              <div className="pw-wrapper">
                <input
                placeholder="******"
                name="password"
                type="password"
                id="pwd"
                className="pl-6 border border-gray-300 px-3 py-2 rounded w-full"
                onChange={handleChange}
              />
              </div>
              
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
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
