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
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;
export const UPDATE_HIGH_SCORE = gql`
  mutation UpdateHighScore($highScore: Int!) {
    updateHighScore(highScore: $highScore) {
      _id
      higherLowerGameHighestScore
    }
  }
`;
