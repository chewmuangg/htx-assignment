import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

function LandingPage() {

  // variables 
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        // make POST request to the backend
        const res = await axios.post('http://localhost:5555/api/users/login', { username, password });
        const { message, token } = res.data;

        // check if token is received
        if (token) {
          // store the token and username in local storage
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);

          // navigate to home
          navigate('/home');
        }

      } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
          alert(error.response.data.message);
        } else {
          alert('Error logging in. Please try again.');
        }
      }
     
  };

  return ( 
    <div className="landing-container">
      <Helmet>
        <title>Audio File Hosting</title>
      </Helmet>
      <div className="landing-left">
        <img src='/images/audiox-logo.png' alt="audioX logo" />
      </div>
      <div className="landing-right">
        <h1>Welcome back!</h1>
        <form className="form-login" onSubmit={handleSubmit}>
          <div className="login-input">
            <label>Username</label>
            <input 
              type="text" 
              name="username"
              placeholder='Enter username'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="login-input">
          <label>Password</label>
            <input
              type="password" 
              name="password"
              placeholder='Enter password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input 
            type="submit" 
            className="btn-pri btn-login"
            value={'Log in'}
          />
          
        </form>
        <hr/>
        <p>
          Don't have an account yet? Sign up <Link to="/signup" className='link-signup'>here</Link>!
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
