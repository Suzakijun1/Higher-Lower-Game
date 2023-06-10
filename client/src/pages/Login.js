import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const userIcon = (
  <FontAwesomeIcon icon={faUser} className="text-black text-2xl" />
);

function Login() {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });
      console.log(data)
      Auth.login(data.login.token);
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
      <div className="flex justify-end my-1">
        <Link to="/signup" className="text-blue-500">
          ← Go to Signup
        </Link>
      </div>

      <div className="flex justify-center items-center h-screen mt-1">
        <div className="w-full max-w-md border border-gray-300 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block font-semibold mb-2">
                Username:
              </label>
              <div class="user-wrapper">
                <input
                  placeholder="username"
                  name="username"
                  type="username"
                  id="username"
                  className="border border-gray-300 px-3 py-2 pl-6 rounded w-full"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block font-semibold mb-2">
                Password:
              </label>
              <div class="pw-wrapper">
                <input
                  placeholder="password"
                  name="password"
                  type="password"
                  id="password"
                  className="border border-gray-300 pl-6 py-2 rounded w-full"
                  onChange={handleChange}
                />
              </div>
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
