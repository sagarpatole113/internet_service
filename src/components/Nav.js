import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'

const Nav = () => {
  return (
    <div>
      <Container>
        <nav class="navbar navbar-light bg-light">
        <Link 
          to={`/`}
          style={{textDecoration:'none',color:'black',paddingLeft: '20px',fontSize: '20px'}}
        >
         Home
        </Link>
        <Link
          to={`/admin-login`}
          class="btn btn-outline-success me-2"
          type="button"
        >
          Admin Login
        </Link>

      </nav>
      </Container>
    </div>
  )
}

export default Nav
