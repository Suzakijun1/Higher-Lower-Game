import React, { useEffect, useState } from "react";
//:::::: Components :::::::::::::
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import DraftGame from "./pages/DraftGame";
import HigherLower from "./pages/HigherLower";
import YourProfile from "./pages/YourProfile";

import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";

const httpLink = createHttpLink({
  uri: "/graphql",
  // headers: { authorization: token }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <div
          className={`${
            isModalOpen ? "fixed inset-0 -z-30 bg-red-500 opacity-50" : ""
          }`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/draftgame" element={<DraftGame />} />
            <Route path="/higherlower" element={<HigherLower />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<YourProfile />} />
          </Routes>
        </div>
        <Footer/>
      </Router>
    </ApolloProvider>
  );
}

export default App;
