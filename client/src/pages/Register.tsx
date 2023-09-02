import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import { RootState } from '../app/store';

interface UserRegister {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

function Register() {
  const [formData, setFormData] = useState<UserRegister>({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });

  const { fullName, username, email, password } = formData;

  const [fieldsComplete, setFieldsComplete] = useState(false);
  useEffect(() => {
    setFieldsComplete(fullName.trim() !== '' && username.trim() !== '' && email.trim() !== '' && password.trim() !== '');
  }, [fullName, username, email, password]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isError) {
      console.log('Error in auth/register');
    }
    if (isSuccess || user) {
      navigate('/home');
    }
  }, [user, isError, isSuccess, isLoading, navigate, dispatch]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData: UserRegister = {
      fullName,
      username,
      email,
      password,
    };
    dispatch(register(userData) as any);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto flex justify-center">
          <img className="logo w-64" src="/images/logo.png" alt="logo" />
        </div>
        <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
          <form className="space-y-6" onSubmit={submitForm}>
            <div>
              <input className="w-full p-2 border border-gray-300 rounded mt-1" type="text" id="fullName" name="fullName" placeholder="Full Name" onChange={onChange} />
            </div>
            <div>
              <input className="w-full p-2 border border-gray-300 rounded mt-1" type="text" id="username" name="username" placeholder="Username" onChange={onChange} />
            </div>
            <div>
              <input className="w-full p-2 border border-gray-300 rounded mt-1" type="email" id="email" name="email" placeholder="Your Email" onChange={onChange} />
            </div>
            <div>
              <input className="w-full p-2 border border-gray-300 rounded mt-1" type="password" id="password" name="password" placeholder="Your Password" onChange={onChange} />
            </div>
            <button className={`w-full py-2 px-4 rounded-md text-white ${fieldsComplete ? 'bg-blue-600 transform hover:scale-101.5' : 'bg-blue-300'}`} disabled={!fieldsComplete} type="submit">
              Sign up
            </button>
          </form>
          <p className="font-medium text-md mt-4">
            Have an account?{' '}
            <Link to="/" className="text-blue-500 font-bold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
