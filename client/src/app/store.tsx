import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import newsfeedReducer from '../features/newsfeed/newsfeedSlice';
import friendsReducer from '../features/friends/friendsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    newsfeed: newsfeedReducer,
    friends: friendsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
