const { gql } = require('apollo-server')

module.exports = gql`
# make mongodb model schema for message
type Message {
    text: String
    createdAt: String
    createdBy: String
}
input MessageInput {
    text: String
    username: String
}
type User {
    username: String
    email: String
    password: String
    token: String
}
input RegisterInput {
    username: String
    email: String
    password: String
}
input LoginInput {
    email: String
    password: String
}
# query and mutation defined in resolvers
type Query {
    message(id: ID!): Message
    messages: [Message]
    user(id: ID!): User
    users: [User]
}
type Mutation {
    createMessage(messageInput: MessageInput): Message!
    registerUser(registerInput: RegisterInput): User!
    loginUser(loginInput: LoginInput): User!
}
`