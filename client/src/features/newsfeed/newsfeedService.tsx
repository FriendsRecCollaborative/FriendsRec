import axios from 'axios';

const userStorageItem = localStorage.getItem('user');
const userInfo = userStorageItem ? JSON.parse(userStorageItem) : null;

const getNewsfeed = async () => {
  const response = await axios.get('/api/review/allreviews');
  return response.data;
};

const getMyReviews = async () => {
  const response = await axios.get(`/api/review/${userInfo.user_id}`);
  return response.data;
};

const newsfeedService = {
  getNewsfeed,
  getMyReviews,
};

export default newsfeedService;
