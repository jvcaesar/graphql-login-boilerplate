import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

// check .env for auth_server address and token string

// address of the authentication server
const httpLink = createHttpLink({
    uri: process.env.REACT_APP_AUTHENTICATION_SERVER
})

// pass the token with an authorization header
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem(process.env.REACT_APP_TOKEN) || ''
        }
    }
})

// create the apolloclient
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default client