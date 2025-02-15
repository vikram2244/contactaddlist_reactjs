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
    dept: '',
    dob: '',
    password: '',
    collegeName: '',
    regNo: '',
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

    const { fName, lName, email, dept, regNo, state, country, password, collegeName, dob, confirmPassword } = formData;
    let currentErrors = [];

    if (!fName) currentErrors.fName = 'First name is required';
    if (!lName) currentErrors.lName = 'Last name is required';
    if (!collegeName) currentErrors.collegeName = 'College name is required';
    if (!email || !email.includes('@')) currentErrors.email = 'Please enter a valid email';
    if (!dept) currentErrors.dept = 'Department is required';
    if (!regNo) currentErrors.regNo = 'Registration number is required';
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
        'http://localhost:8080/api/register',
        { fName, lName, email, dept, dob, password, collegeName, regNo, state, country },
        { withCredentials: true }
      );
      setSuccessMessage('Registration successful!');
      console.log(formData);
      console.log(errors);
      console.log(response.data.email);
      currentErrors.server='Email is Already exist';
      if(response.status===208){
        setErrors(currentErrors);
      }else{
      navigate('/login');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || 'An error occurred. Please try again.';
      console.log(err);
      console.log('error......')
      setErrors({ server: errorMessage });
    }
    };

  return (
    <>
      <div className='ml-24 mr-24 py-14'>
        <form onSubmit={handleSubmit}>
          <div>
            <h1 className='text-center font-serif text-5xl'>Registration</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 ml-20 mr-16 mt-3 ">
            <Input label="First Name:" type="text" name="fName" value={formData.fName} onChange={handleChange} error={errors.fName} />
            <Input label="Last Name:" type="text" name="lName" value={formData.lName} onChange={handleChange} error={errors.lName} />
            <Input label="College Name:" type="text" name="collegeName" value={formData.collegeName} onChange={handleChange} error={errors.collegeName} />
            <Input label="Email:" type="text" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
            <Input label="Date Of Birth:" type="date" name="dob" value={formData.dob} onChange={handleChange} />
            <Input label="Regd No:" type="text" name="regNo" value={formData.regNo} onChange={handleChange} error={errors.regNo} />
            <Input label="Country:" type="text" name="country" value={formData.country} onChange={handleChange} error={errors.country} />
            <Input label="State:" type="text" name="state" value={formData.state} onChange={handleChange} error={errors.state} />
            <Input label="Department:" type="text" name="dept" value={formData.dept} onChange={handleChange} error={errors.dept} />
            <Input label="Password:" type="password" name="password" value={formData.password} onChange={handleChange} error={errors.password} />
            <Input label="Confirm Password:" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
          </div>
          <div className='text-center mt-6'>
            <Button>Submit</Button>
          </div>
          {/* {successMessage.server && <p className="text-green-500 text-center mt-4">{successMessage}</p>} */}
          {errors.server && <p className="text-red-500 text-center mt-4">{errors.server}</p>}
        </form>
        <div className='text-right mr-20'>
          <p className='text-black'>
            Already have an account? 
            <Link className='text-black' to="/login">
              <u>Login</u>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Registration;
