import React, {useState} from 'react'
import logo from '../Assets/Images/logomml.svg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {

  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = 'https://mml-backend.vercel.app/loginadmin';
    const data = {
      phone: phone,
      password: password
    };

    console.log(data)

    try {
      axios.post(url, data, {
        headers: {
          "Content-Type": "application/json"
        },
        timeout: 5000
      })
        .then(res => {
          console.log(res.data.status)
          // if(res.data.status === 200){
            console.log('Login successful:', res.data);
            navigate("/dashboard")
          // }
        }).catch(e => {

          console.log(e?.response?.data)
          setError(e?.response?.data?.message || 'Login failed');
        })

    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <>
      <div className="flex min-h-screen   bg-cover bg-center bg-gradient-to-r from-blue-950 to-blue-950 flex-1 flex-col justify-center px-6 py-8 lg:px-8" >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-40 w-auto"
            src={logo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">

          <form className="space-y-6" /*action="#" method="POST"*/ >
            <div>
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-white">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  autoComplete="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
                <div className="text-sm">
                  <a href="/forgotpassword" className="font-semibold text-yellow-400 hover:text-indigo-700">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full p-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                />
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

            <div>
              <button
                type="submit"
                
                onClick={
                  handleLogin
                }
                className="flex w-full justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                 {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

        
        </div>
      </div>
    </>
  )
}
