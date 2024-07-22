import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

function SignUp() {

    // variables 
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [cfmPassword, setCfmPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if the passwords match
        if (password !== cfmPassword){
            alert('Passwords do not match!');
            return;
        }

        // make POST request to the backend to signup
        try {
            const res = await axios.post('http://localhost:5555/api/users/signup', { username, password });
            console.log(res);
            alert("Signup successful :)");
        } catch (error) {
            console.log(error);
            alert("Error signing up :(");
        }
        
        // login after signing up
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
        }
    };

    return (
        <div className="signup-bg">
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <div className="signup-container">
                <h1 className="signup-heading">Create an account</h1>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <label>Username</label>
                    <div className="login-input">
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Enter username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <label>Password</label>
                    <div className="login-input">
                        <input 
                            type="password" 
                            name="password"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <label>Confirm password</label>
                    <div className="login-input">
                        <input 
                            type="password" 
                            name="cfmPassword"
                            placeholder="Confirm password"
                            onChange={(e) => setCfmPassword(e.target.value)}
                        />
                    </div>
                    <input 
                        type="submit" 
                        className="btn-pri btn-login"
                        value={'Sign up'}
                    />
                </form>
            </div>

        </div>
    );
}

export default SignUp