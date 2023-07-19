import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import GetStatus from './GetStatus'

const Nav = () => {
  return (
    <div>
      <Container>
        <nav class="navbar navbar-light bg-light justify-content-end">
          <GetStatus />
        <Link
          to={`/admin-login`}
          class="btn btn-outline-success me-2"
          type="button"
        >
          Admin Logn
        </Link>

      </nav>
      </Container>
    </div>
  )
}

export default Nav
