import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [loginUser, { error, data }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { ...formState },
      });
      Auth.login(data.loginUser.token);
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
        <Link to="/signup" className="text-blue-500">
          ← Go to Signup
        </Link>
      </div>

      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md border border-gray-300 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold mb-2">
                Email:
              </label>
              <input
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                className="border border-gray-300 px-3 py-2 rounded w-full"
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block font-semibold mb-2">
                Password:
              </label>
              <input
                placeholder="******"
                name="password"
                type="password"
                id="password"
                className="border border-gray-300 px-3 py-2 rounded w-full"
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
