import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import { RootState } from '../app/store';

interface User {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

function Register() {
  const [formData, setFormData] = useState<User>({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });

  const { fullName, username, email, password } = formData;

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

    dispatch(reset());
  }, [user, isError, isSuccess, isLoading, navigate, dispatch]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData: User = {
      fullName,
      username,
      email,
      password,
    };
    dispatch(register(userData) as any);
  };

  return (
    <>
      <div className="auth-for-container">
        <form className="register-form" onSubmit={submitForm}>
          <div>
            <input type="text" id="fullName" name="fullName" placeholder="Full Name" onChange={onChange} />
          </div>
          <div>
            <input type="text" id="username" name="username" placeholder="Username" onChange={onChange} />
          </div>
          <div>
            <input type="email" id="email" name="email" placeholder="Your Email" onChange={onChange} />
          </div>
          <div>
            <input type="password" id="password" name="password" placeholder="Your Password" onChange={onChange} />
          </div>
          <button className="sign-up" type="submit">
            Sign up
          </button>
        </form>
        <p className="login-link">
          Have an account? <Link to="/">Log in</Link>
        </p>
      </div>
    </>
  );
}

export default Register;
