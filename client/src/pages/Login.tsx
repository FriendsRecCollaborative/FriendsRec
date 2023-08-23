import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import { RootState } from '../app/store';

interface UserLogin {
  username: string;
  password: string;
}

function Register() {
  const [formData, setFormData] = useState<UserLogin>({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isError) {
      console.log('Error in auth/login');
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
    const userData: UserLogin = {
      username,
      password,
    };
    dispatch(login(userData) as any);
  };

  return (
    <>
      <div className="auth-for-container">
        <form className="register-form" onSubmit={submitForm}>
          <div>
            <input type="text" id="username" name="username" placeholder="Username" onChange={onChange} />
          </div>
          <div>
            <input type="password" id="password" name="password" placeholder="Your Password" onChange={onChange} />
          </div>
          <button className="sign-up" type="submit">
            Login
          </button>
        </form>
        <p className="register-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </>
  );
}

export default Register;
