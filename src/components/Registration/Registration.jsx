import React, { useState } from 'react';
import Input from '../Inputs/Input.jsx';
import Button from '../Buttons/Button.jsx';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import vilsLogo1 from '../../assets/vilsLogo1.svg';

function Registration() {
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    email: '',
    dob: '',
    password: '',
    state: '',
    country: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage(null);

    const { fName, lName, email, state, country, password, dob, confirmPassword } = formData;
    let currentErrors = {};

    if (!fName) currentErrors.fName = 'First name is required';
    if (!lName) currentErrors.lName = 'Last name is required';
    if (!email || !email.includes('@')) currentErrors.email = 'Please enter a valid email';
    if (!state) currentErrors.state = 'State is required';
    if (!country) currentErrors.country = 'Country is required';
    if (!password) currentErrors.password = 'Password is required';
    if (password !== confirmPassword) currentErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    try {
      const response = await axios.post(
        'https://contactaddlist springboot.onrender.com/api/register',
        { fName, lName, email, dob, password, state, country },
        { withCredentials: true }
      );
      setSuccessMessage('Registration successful!');
      if (response.status === 208) {
        setErrors({ server: 'Email already exists' });
      } else {
        navigate('/login');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || 'An error occurred. Please try again.';
      setErrors({ server: errorMessage });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src={vilsLogo1} alt="VILS Logo" className="h-12 w-auto" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-serif">
          Create Your Account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <Input
                label="First Name"
                type="text"
                name="fName"
                value={formData.fName}
                onChange={handleChange}
                error={errors.fName}
              />
              <Input
                label="Last Name"
                type="text"
                name="lName"
                value={formData.lName}
                onChange={handleChange}
                error={errors.lName}
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Input
                label="Date of Birth"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
              <Input
                label="Country"
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                error={errors.country}
              />
              <Input
                label="State"
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                error={errors.state}
              />
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />
            </div>

            {errors.server && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm font-medium text-red-800">{errors.server}</p>
              </div>
            )}

            {successMessage && (
              <div className="rounded-md bg-green-50 p-4">
                <p className="text-sm font-medium text-green-800">{successMessage}</p>
              </div>
            )}

            <div className="text-center">
              <Button
                type="submit">
                Register
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;