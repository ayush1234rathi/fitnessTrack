import LoginForm from './Login.jsx';
import SignUpForm from './SignUp';
import { useState } from 'react';
import img from '../../assets/img2.jpg';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="grow" 
    style={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className={`mt-6 text-center text-3xl font-extrabold text-white ${isLogin?'sm:mt-12':''}  `}>
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Or{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-indigo-500 hover:text-indigo-600"
            >
              {isLogin ? 'Create a new account' : 'Sign in to your existing account'}
            </button>
          </p>
        </div>

        <div className="mt-8 mx-auto w-11/12 sm:w-full sm:max-w-md">
          <div className="bg-white py-8  px-4 shadow rounded-lg sm:px-10">
            {isLogin ? <LoginForm /> : <SignUpForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;