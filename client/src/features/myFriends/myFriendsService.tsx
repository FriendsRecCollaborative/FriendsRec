import axios from 'axios';

const addFriend = async (friendData: any) => {
  const response = await axios.post('/api/auth/addfriend', friendData);
  return response.data;
};

const myFriendsService = {
  addFriend,
};

export default myFriendsService;
