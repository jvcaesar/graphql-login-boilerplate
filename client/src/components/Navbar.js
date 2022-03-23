import { useContext } from 'react'
import { AppBar, Box, Typography, Button, Toolbar } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    console.log('User: ', user)

    const onLogout = () => {
        logout()
        navigate('/')
    }

  return (
    <Box sx={{flexGrow: 1}}>
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h5' component='div'>
                    <Link to='/' style={{textDecoration: 'none', color: 'white'}}>ReactLogin</Link>
                </Typography>
                <Box alignItems='right' sx={{flexGrow: 1, textAlign: 'right'}}>
                    { user ?
                        <Button onClick={onLogout} style={{textDecoration: 'none', color: 'white', marginRight:'10px'}}>Logout</Button>
                    :
                        <>
                            <Link to='/login' style={{textDecoration: 'none', color: 'white', marginRight:'10px'}}>Login</Link>
                            <Link to='/register' style={{textDecoration: 'none', color: 'white'}}>Register</Link>
                        </>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    </Box>
  )
}

export default Navbar