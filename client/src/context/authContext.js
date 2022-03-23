import React, { useReducer, createContext } from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
    user: null
}

//check if token exists and is valid
const token = localStorage.getItem(process.env.REACT_APP_TOKEN)
if (token) {
    const decodedToken = jwtDecode(token)
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem(process.env.REACT_APP_TOKEN)
    } else {
        initialState.user = decodedToken
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
})

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}

const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    const login = (userData) => {
        localStorage.setItem(process.env.REACT_APP_TOKEN, userData.token)
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    const logout = () => {
        localStorage.removeItem(process.env.REACT_APP_TOKEN)
        dispatch({ type: 'LOGOUT' })
    }

    return (
        <AuthContext.Provider 
            value = {{ user: state.user, login, logout }}
            { ...props }
        />
    )
}

export { AuthContext, AuthProvider }