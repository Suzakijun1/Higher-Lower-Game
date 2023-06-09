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
export const UPDATE_HIGHSCORE = gql`
  mutation Mutation($streak: Int!, $username: String!) {
  updateHigherLowerHighestScore(streak: $streak, username: $username) {
    username
    higherLowerGamesPlayed
    higherLowerGameHighestScore
  }
}
`;
