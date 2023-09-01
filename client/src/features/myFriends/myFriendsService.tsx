import axios from 'axios';

const userInfo = JSON.parse(localStorage.getItem('user') || '');

const addFriend = async (friendData: any) => {
  const response = await axios.post('/api/auth/addfriend', friendData);
  console.log('add', response);
  return response.data;
};

const getMyFriends = async () => {
  const response = await axios.get(`/api/auth/following/${userInfo.user_id}`);
  console.log('get', response);
  return response.data;
};

const myFriendsService = {
  addFriend,
  getMyFriends,
};

export default myFriendsService;
