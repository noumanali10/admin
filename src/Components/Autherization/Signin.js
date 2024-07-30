import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../MiddleWare/AuthContext'; // Adjusted path
import axios from 'axios';
// Confirmation
export default function Signin() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        email: "", password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://backend-two-mu-64.vercel.app/user/login', userData);
            const data = response.data;
            if (response.status === 200) {
                localStorage.setItem('token', data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                setIsAuthenticated(true);
                navigate("/admin");
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow" />
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
                    Or
                    <Link to="/signup"
                        className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                        create a new account
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">Email address</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input id="email" name="email" placeholder="user@example.com" type="email" value={userData.email} onChange={handleChange} required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">Password</label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input id="password" name="password" type="password" value={userData.password} onChange={handleChange} required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember_me" name="remember" type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                                <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">Remember me</label>
                            </div>
                        </div>

                        <div className="mt-6">
                            <span className="block w-full rounded-md shadow-sm">
                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                    Sign in
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
