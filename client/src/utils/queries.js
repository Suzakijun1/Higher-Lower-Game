import { gql } from "@apollo/client";

export const HERO_IMG = gql`
query Hero($heroId: String!) {
  hero(id: $heroId) {
    image {
      url
    }
  }
}
`;
