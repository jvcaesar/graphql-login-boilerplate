import { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import useForm from '../utility/hooks'
import { useMutation } from '@apollo/react-hooks'

import { TextField, Button, Container, Stack, Alert } from '@mui/material'

import { gql } from 'graphql-tag'
import { useNavigate } from 'react-router-dom'

const REGISTER_USER = gql`
    mutation Mutation($registerInput: RegisterInput) {
        registerUser(registerInput: $registerInput) {
            email
            username
            token
        }
    }
`

const Register = (props) => {
    const context = useContext(AuthContext)
    const navigate = useNavigate()
    const [errors, setErrors] = useState([])

    const registerUserCallback = () => {
        //console.log('Register callback hit', process.env)
        registerUser()
    }

    const { onChange, onSubmit, values } = useForm(registerUserCallback, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { registerUser: userData }}) {
            context.login(userData)
            // navigate to homepage when user is successfully logged in
            navigate('/')
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors)
        },
        variables: { registerInput: values }
    })

    return (
        <Container spacing={2} maxWidth='sm'>
            <h3>Register</h3>
            <p>Register below to create an account.</p>
            <Stack spacing={2} paddingBottom={2}>
                <TextField 
                    label='Username'
                    name='username'
                    onChange={onChange}
                />
                <TextField 
                    label='Email'
                    name='email'
                    onChange={onChange}
                />
                <TextField 
                    label='Password'
                    name='password'
                    onChange={onChange}
                />
                <TextField 
                    label='Confirm Password'
                    name='confirmPassword'
                    onChange={onChange}
                />
            </Stack>
            {errors.map((error, i) => {
                return (
                    <Alert key={i} severity='error'>
                        {error.message}
                    </Alert>
                )
            })}
            <Button variant='contained' onClick={onSubmit}>Register</Button>
        </Container>
    )
}

export default Register