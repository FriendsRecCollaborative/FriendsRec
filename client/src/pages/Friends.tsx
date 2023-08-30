import Sidebar from '../Sidebar';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { addFriend, getFriends } from '../features/friends/friendsSlice';

function Friends() {
  const [friend, setFriend] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { friends, isError, isSuccess } = useSelector((state: RootState) => state.friends);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addFriend({ friend }) as any);
    setFriend('');
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    }

    dispatch(getFriends() as any);
  }, [user, navigate, isError, dispatch, isSuccess, friends]);
  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-80">
          <div className="mr-64 p-20 pt-24 border-r-[1.5px] h-full right-0">
            <div className="mt-4">
              <form onSubmit={onSubmit} className="flex gap-5 items-center">
                <input
                  className="w-[250px] p-2 border border-gray-300 rounded mt-1"
                  type="text"
                  placeholder="Username"
                  id="username"
                  name="username"
                  value={friend}
                  onChange={(e) => setFriend(e.target.value)}
                />
                <button className="flex items-center justify-center w-[75px] h-10 rounded-md text-white bg-blue-500 transform hover:scale-101.5 gap-1" type="submit">
                  <svg className="w-6 h-6 pt-0.5 pl-0.5 text-white" fill="currentColor">
                    <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                  </svg>
                  Add
                </button>
              </form>
            </div>
            <section className=" text-gray-600 ">
              <div className="pt-10">
                <div className="max-h-[750px] overflow-y-auto">
                  <div className=" w-[400px] bg-white shadow-sm rounded-sm ">
                    <div className="p-3">
                      <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                          <thead className="text-xs font-semibold uppercase text-gray-400">
                            <tr>
                              <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Name</div>
                              </th>
                              <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Username</div>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-sm divide-y divide-gray-100">
                            <tr>
                              <td className="p-2 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="font-medium text-gray-800">Kevin Yoon</div>
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-left">kyoon0</div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <svg className="w-6 h-6 text-red-400" fill="currentColor">
                                  <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z" />
                                </svg>
                              </td>
                            </tr>
                            <tr>
                              <td className="p-2 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="font-medium text-gray-800">Andrew Larkin</div>
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-left">larkinaj</div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <svg className="w-6 h-6 text-red-400" fill="currentColor">
                                  <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z" />
                                </svg>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Friends;
