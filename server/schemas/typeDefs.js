const { gql } = require("apollo-server-express")


const typeDefs = gql`
    type User {
        _id: ID
        email: String
        password: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Powerstats {
        intelligence: String
        strength: String
        speed: String
        durability: String
        power: String
        combat: String
    }

    type Biography {
        full_name: String
        alter_egos: String
        aliases: [String]
        place_of_birth: String
        first_appearance: String
        publisher: String
        alignment: String
    }

    type Appearance {
        gender: String
        race: String
        height: [String]
        weight: [String]
        eye_color: String
        hair_color: String
    }

    type Work {
        occupation: String
        base: String
    }

    type Connections {
        group_affiliation: String
        relatives: String
    }

    type Image {
        url: String
    }


    type Hero {
        _id : ID
        response: String
        id: String
        name: String
        powerstats: Powerstats
        biography: Biography
        appearance: Appearance
        work: Work
        connections: Connections
        image: Image
    }

    type Query {
        heroes: [Hero]
        hero(id: String!): Hero
        users: [User]
        user(email: String!): User
        me: User
    }

    type Mutation {
        addUser(email: String!, password: String!) : User
        login(email: String!, password: String!): Auth
    }
`

module.exports = typeDefs;