import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import bgImage from "../images/battlegrounds-14.jpeg";

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
    <div
      className="bg-cover"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="flex justify-end pt-4 mb-40">
        <Link to="/signup" className="text-blue-500 mr-6 tracking-widest">
          ← Go to Signup
        </Link>
      </div>

      <div className="flex justify-center items-start h-screen mt-1 w-full">
        <div className="mt-20 bg-center bg-gray-800 bg-opacity-60 w-full max-w-md border border-gray-300 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-center tracking-widest">
            Login
          </h2>
          <form onSubmit={handleFormSubmit} className="text-center">
            <div className="mb-4">
              {/* <label htmlFor="username" className="block font-semibold mb-2">
                Username:
              </label> */}
              <div class="user-wrapper">
                <input
                  placeholder="username"
                  name="username"
                  type="username"
                  id="username"
                  className="tracking-widest pl-6 border border-gray-300 px-3 py-2 rounded w-full"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-6">
              {/* <label htmlFor="password" className="block font-semibold mb-2">
                Password:
              </label> */}
              <div class="pw-wrapper">
                <input
                  placeholder="password"
                  name="password"
                  type="password"
                  id="password"
                  className=" tracking-widest pl-6 border border-gray-300 px-3 py-2 rounded w-full"
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
