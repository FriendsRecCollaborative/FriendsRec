import axios from 'axios';

const API_URL = '/api/newsfeed/';

const getNewsfeed = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const newsfeedService = {
  getNewsfeed,
};

export default newsfeedService;
