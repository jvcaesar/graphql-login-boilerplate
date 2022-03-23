import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import client from './apolloClient'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext';

// the react application needs access to...
// client
// authorization context
// browser router (react router) /login /register

ReactDOM.render(
    <AuthProvider>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ApolloProvider>
    </AuthProvider>, 
    document.getElementById('root')
);
