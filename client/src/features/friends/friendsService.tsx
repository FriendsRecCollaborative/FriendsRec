import axios from 'axios';

const API_URL = '/api/friends';

const addFriend = async (friendData: any) => {
  const response = await axios.post(API_URL, friendData);
  return response.data;
};

const getFriends = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const friendsService = {
  addFriend,
  getFriends,
};

export default friendsService;
