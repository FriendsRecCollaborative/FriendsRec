import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import newsfeedReducer from '../features/newsfeed/newsfeedSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    newsfeed: newsfeedReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
