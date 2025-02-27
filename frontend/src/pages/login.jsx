import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/spinner';


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password} = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth);

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, dispatch, message, navigate])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password
    }

    dispatch(login(userData));
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt fill='#1e1e65'/>Login
        </h1>
        <p>Please log in to get support</p>

      </section>

      <section className="form login-form">
        <form onSubmit={onSubmit}>
           <div className="form-group">
            <input 
              type="email" 
              className="form-control"
              id="email" 
              value={email}
              name="email"
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>

           <div className="form-group">
            <input 
              type="password" 
              className="form-control"
              id="password" 
              value={password}
              name="password"
              onChange={onChange}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>

      </section>
    </>
  )
}

export default Login
