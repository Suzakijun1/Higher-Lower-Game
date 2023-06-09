import { gql } from "@apollo/client";

export const HERO_IMG = gql`
  query Hero($heroId: String!) {
    hero(id: $heroId) {
      name
      image {
        url
      }
      powerstats {
        strength
        speed
        power
        durability
        intelligence
        combat
      }
      id
    }
  }
`;

export const USER_HIGHSCORE = gql`
query User {
  user{
    higherLowerGameHighestScore
  }
}
`

export const USER_DATA = gql`
query Query {
  me {
    username
    password
    higherLowerGamesPlayed
    higherLowerGameHighestScore
    draftGamesPlayed
    draftGameWins
    draftGameLosses
    email
    _id
  }
}
`
