import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation Mutation($email: String!, $username: String!, $password: String!) {
    addUser(email: $email, username: $username, password: $password) {
      user {
        username
        password
        email
      }
      token
    }
  }
`;
export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;
