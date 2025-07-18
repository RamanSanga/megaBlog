import React from 'react'
import {Container, Logo, Logout} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className='py-3 shadow-md bg-gray-800 text-gray-50'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='150px'  height = '30px'  />

              </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-block px-6 py-2 duration-200 hover:bg-green-500 rounded-full'
                >{item.name}</button>
                {/* <Link
                   to={item.slug}
                  className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                 >
                  {item.name}
                  </Link> */}
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <Logout />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header