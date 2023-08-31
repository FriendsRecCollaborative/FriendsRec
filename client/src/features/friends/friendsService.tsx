import axios from 'axios';

const addFriend = async (friendData: any) => {
  const response = await axios.post('/api/auth/addfriend', friendData);
  return response.data;
};

const getFriends = async () => {
  const response = await axios.get('/api/auth/allusers');
  return response.data;
};

const friendsService = {
  addFriend,
  getFriends,
};

export default friendsService;
