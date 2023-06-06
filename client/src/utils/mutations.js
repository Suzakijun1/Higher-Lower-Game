import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation Mutation($email: String!, $username: String!, $password: String!) {
  addUser(email: $email, username: $username, password: $password) {
    username
    password
    email
  }
}
`;
