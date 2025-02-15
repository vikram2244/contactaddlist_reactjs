import React, { useState } from 'react';
import Input from '../Inputs/Input.jsx';
import Button from '../Buttons/Button.jsx';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess,setEmailLogin  }) {
  const [formData, setFormData] = useState({
    emailLogin: '',
    passwordLogin: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { emailLogin, passwordLogin } = formData;
    const currentErrors = {};

    if (!emailLogin || !emailLogin.includes('@'))
      currentErrors.emailLogin = 'Please enter a valid email.';
    if (!passwordLogin) currentErrors.passwordLogin = 'Password is required.';

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8080/api/login',
        { emailLogin, passwordLogin },
        { withCredentials: true }
      );

      if (response.data === true) {
        onLoginSuccess();
        setEmailLogin(emailLogin);
        navigate(`/contact/${emailLogin}`);
      } else {
        setErrors({ server: 'Invalid Credentials.' });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data || err.message || 'An error occurred. Please try again.';
      setErrors({ server: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <div className="flex flex-col items-center min-h-screen py-40 px-4">
      <div className="w-full max-w-md px-4 py-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-center text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Email:"
              type="text"
              name="emailLogin"
              value={formData.emailLogin}
              onChange={handleChange}
              error={errors.emailLogin}
            />
            <Input
              label="Password:"
              type="password"
              name="passwordLogin"
              value={formData.passwordLogin}
              onChange={handleChange}
              error={errors.passwordLogin}
            />
          </div>
          <div className="text-center mt-6">
            {errors.server && <p className="text-red-500 text-sm mb-2">{errors.server}</p>}
            <Button disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Submit'}
            </Button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-black">
            Don't have an account?{' '}
            <Link className="text-blue-500" to="/register">
              <u>Register</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
