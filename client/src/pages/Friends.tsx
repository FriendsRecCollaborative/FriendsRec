import Sidebar from '../Sidebar';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { getFriends } from '../features/friends/friendsSlice';
import { addFriend, removeFriend } from '../features/myFriends/myFriendsSlice';
import { getMyFriends } from '../features/myFriends/myFriendsSlice';

interface FriendType {
  user_id: string;
  full_name: string;
  username: string;
}

// interface User {
//   fullName: string;
//   username: string;
//   email: string;
//   password: string;
//   user_id: number;
// }

function Friends() {
  const [friend, setFriend] = useState('');
  const [filteredFriends, setFilteredFriends] = useState<Array<FriendType>>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { friends } = useSelector((state: RootState) => state.friends);
  const { myFriends } = useSelector((state: RootState) => state.myFriends);

  const userInfo = JSON.parse(localStorage.getItem('user') || '');

  const addClick = async (user_id: string) => {
    if (user && userInfo) {
      await dispatch(addFriend({ userId: userInfo.user_id, friendId: user_id }) as any);
      dispatch(getMyFriends() as any);
    }
  };

  const removeClick = async (user_id: string) => {
    if (user && userInfo) {
      dispatch(removeFriend({ user_id: userInfo.user_id, friend_id: user_id }) as any);
      dispatch(getMyFriends() as any);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    dispatch(getFriends() as any);
    dispatch(getMyFriends() as any);
  }, [user, dispatch, navigate]);

  useEffect(() => {
    const filtered = friends.filter((friendItem) => friendItem.username.toLowerCase().includes(friend.toLowerCase()));
    setFilteredFriends(filtered);
  }, [friend, friends]);

  const sortedFriends = [...filteredFriends].sort((a, b) => {
    const isAFriend = myFriends.some((friendArray) => friendArray.friend_id === a.user_id);
    const isBFriend = myFriends.some((friendArray) => friendArray.friend_id === b.user_id);

    if (isAFriend && !isBFriend) {
      return -1;
    }
    if (!isAFriend && isBFriend) {
      return 1;
    }
    return 0;
  });

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-80">
          <div className="mr-64 p-20 pt-24 border-r-[1.5px] h-full right-0">
            <div className="relative w-96">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                type="search"
                className="block w-full p-4 pl-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search username"
                id="username"
                name="username"
                value={friend}
                onChange={(e) => setFriend(e.target.value)}
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Search
              </button>
            </div>
            <section className="text-gray-600 ">
              <div className="pt-10">
                <div className="max-h-[550px] w-[550px] overflow-y-scroll">
                  <div className="w-[550px] bg-white shadow-sm rounded-sm ">
                    <div className="p-3">
                      <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                          <thead className="text-xs font-semibold uppercase text-gray-400">
                            <tr>
                              <th className="p-2 whitespace-nowrap sticky top-0 bg-white z-10">
                                <div className="font-semibold text-left">Name</div>
                              </th>
                              <th className="p-2 whitespace-nowrap sticky top-0 bg-white z-10">
                                <div className="font-semibold text-left">Username</div>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-sm divide-y divide-gray-100">
                            {sortedFriends.map((item, index) => {
                              const isFriendAdded = myFriends.some((friendArray) => friendArray.friend_id === item.user_id);
                              return (
                                <tr key={index}>
                                  <td className="p-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className="font-medium text-gray-800">{item.full_name}</div>
                                    </div>
                                  </td>
                                  <td className="p-2 whitespace-nowrap">
                                    <div className="text-left">{item.username}</div>
                                  </td>
                                  <td className="flex justify-center items-center">
                                    <div className="mt-2 mb-2">
                                      {isFriendAdded ? (
                                        <button onClick={() => removeClick(item.user_id)} className="bg-gray-200 text-black rounded-lg px-4 py-2">
                                          Unfollow
                                        </button>
                                      ) : (
                                        <button onClick={() => addClick(item.user_id)} className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2">
                                          Follow
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
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
