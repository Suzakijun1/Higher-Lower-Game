import React, { useEffect } from "react";
import Navbar from "./components/navbar";
import Signup from "./pages/Signup";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
