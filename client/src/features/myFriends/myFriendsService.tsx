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

const removeFriend = async (friendData: any) => {
  const response = await axios.delete('/api/auth/removefriend', friendData);
  console.log(response);
  return response.data;
};

const myFriendsService = {
  addFriend,
  getMyFriends,
  removeFriend,
};

export default myFriendsService;
