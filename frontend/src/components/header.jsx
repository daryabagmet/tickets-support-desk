import { FaSignInAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = ()=> {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className='btn' onClick={onLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li>
          <Link to="/login">
            <FaSignInAlt fill='#1e1e65' />Login
          </Link>
          </li>
          <li>
          <Link to="/register">
            <FaUser fill='#1e1e65'/>Register
          </Link>
        </li>
          </>
        )}
        
      </ul>
    </header>
  )
}

export default Header
