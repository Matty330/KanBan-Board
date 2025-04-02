// Path: Kandban Board/client/src/components/Navbar.tsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [ loginCheck, setLoginCheck ] = useState(false);

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    } else {
      setLoginCheck(false);
    }
  };

  const handleLogout = () => {
    auth.logout();
    setLoginCheck(false);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className='nav'>
      <div className='nav-title'>
        <Link to='/'>Krazy Kanban Board</Link>
      </div>
      <ul>
      {
        !loginCheck ? (
          <li className='nav-item'>
            <Link to='/login' className='nav-button'>Login</Link>
          </li>
        ) : (
          <li className='nav-item'>
            <button 
              type='button' 
              onClick={handleLogout}
              className='nav-button'
            >
              Logout
            </button>
          </li>
        )
      }
      </ul>
    </div>
  )
}

export default Navbar;