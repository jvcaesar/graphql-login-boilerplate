import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

const Homepage = () => {
  const { user } = useContext(AuthContext)

  return (
    <div>
        <h1>This is the home page.</h1>
        {user ?
          <h2>{user.username} is logged into the system.</h2>
        :
          <p>Use the links above to login or regiser</p>
        }
    </div>
  )
}

export default Homepage