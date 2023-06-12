import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import bgImage from "../images/will-wang-fafnir-background-concept.jpg";

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
      Auth.login(data.addUser.token);
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
      className="bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
          >
    <div className="flex justify-end pt-4 mb-40 ">
      <div className="flex justify-end py-4">
        <Link to="/login" className="tracking-widest text-blue-500 mr-6">
          ← Go to Login
        </Link>
      </div>
      </div>





      <div className="flex justify-center items-start h-screen w-full">
        <div className="mt-20 w-full max-w-md  border border-gray-300 rounded-lg shadow-lg p-8 bg-gray-800 bg-opacity-60">
          <h2 className="tracking-widest text-3xl font-bold mb-4 text-center">Signup</h2>
          <form onSubmit={handleFormSubmit} className="text-center">
            <div className="mt-4">
              <div className="user-wrapper">
                <input
                placeholder="User Name"
                name="username"
                type="text"
                id="username"
                className="tracking-widest mb-4 pl-6 border font-sans text-black border-gray-300 px-3 py-2 rounded w-full"
                onChange={handleChange}
              />
              </div>
            </div>

            <div className="mb-4">
              <div className="email-wrapper">
                <input
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                className="tracking-widest pl-6 border font-sans text-black border-gray-300 px-3 py-2 rounded w-full"
                onChange={handleChange}
              />
              </div>
            </div>

            <div className="mb-6">
              <div className="pw-wrapper">
                <input
                placeholder="******"
                name="password"
                type="password"
                id="pwd"
                className="tracking-widest pl-6 border font-sans text-black border-gray-300 px-3 py-2 rounded w-full"
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
