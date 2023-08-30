import axios from 'axios';

const getNewsfeed = async () => {
  const response = await axios.get('/api/review/allreviews');
  return response.data;
};

const newsfeedService = {
  getNewsfeed,
};

export default newsfeedService;
