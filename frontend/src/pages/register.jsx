import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/spinner';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2} = formData;

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

    if(password !== password2){
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password
      }

      dispatch(register(userData));
    }
  }

  if(isLoading) {
    return <Spinner/>
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser fill='#1e1e65'/>Register
        </h1>
        <p>Please create an account</p>

      </section>

      <section className="form register-form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              className="form-control"
              id="name" 
              value={name}
              name="name"
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
          </div>

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
            <input 
              type="password" 
              className="form-control"
              id="password2" 
              value={password2}
              name="password2"
              onChange={onChange}
              placeholder="Confirm password"
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

export default Register