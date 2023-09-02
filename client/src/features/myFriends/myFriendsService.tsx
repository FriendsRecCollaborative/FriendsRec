import axios from 'axios';

const userInfo = JSON.parse(localStorage.getItem('user') || '');

const addFriend = async (friendData: any) => {
  const response = await axios.post('/api/auth/addfriend', friendData);
  return response.data;
};

const getMyFriends = async () => {
  const response = await axios.get(`/api/auth/following/${userInfo.user_id}`);
  return response.data;
};

const getMyFollowers = async () => {
  const response = await axios.get(`/api/auth/followers/${userInfo.user_id}`);
  return response.data;
};

const removeFriend = async (friendData: any) => {
  const response = await axios.delete('/api/auth/removefriend', {
    data: friendData,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

const myFriendsService = {
  addFriend,
  getMyFriends,
  getMyFollowers,
  removeFriend,
};

export default myFriendsService;
