require('dotenv').config()
const { ApolloServer } = require('apollo-server')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const connectDB = require('./dbmongodb/connect')
const { config } = require('dotenv')
const port = process.env.PORT || 5001

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        server.listen(port, () => console.log('Server started'))
    } catch (error) {
        console.log('start: ', error)
    }
}

start()