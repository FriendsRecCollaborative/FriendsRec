import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../src/features/auth/authSlice';
import { RootState } from './app/store';

function Sidebar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const logoutClick = () => {
    navigate('/');
    dispatch(logout() as any);
    dispatch(reset());
  };

  const toggleMenu = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <aside className="fixed top-0 left-0 w-80 h-screen border-r-[1.5px] ">
          <div className="h-full px-10 py-16 ">
            <a href="https://github.com/FriendsRecCollaborative/FriendsRec" className="flex items-center pl-2 mb-16">
              <img className="logo w-48" src="/images/logo.png" alt="logo" />
            </a>
            <ul className="space-y-7 font-medium">
              <li>
                <Link to="/home">
                  <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ">
                    <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    <span className="ml-5">Home</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/searchrecs">
                  <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ">
                    <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                      <path d="M8 15.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm11.707 2.793-4-4a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    <span className="ml-5 ">Search</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/friends">
                  <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ">
                    <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                      <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                    </svg>
                    <span className="ml-5 ">Find Friends</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/myprofile">
                  <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ">
                    <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    <span className="ml-5 ">My Profile</span>
                  </div>
                </Link>
              </li>
              <li>
                <div
                  ref={menuRef}
                  className={`relative flex items-center p-2 text-gray-900 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${open ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                  onClick={toggleMenu}>
                  <svg className="w-5 h-5 pt-2 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                  <span className="ml-5">More</span>
                  {open && (
                    <div className="absolute top-full left-0 mt-2 ml-5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-3 z-10">
                      <button onClick={logoutClick}>Log out</button>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

export default Sidebar;
