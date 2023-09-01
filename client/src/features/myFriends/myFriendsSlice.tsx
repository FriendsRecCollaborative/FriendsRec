import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import myFriendsService from './myFriendsService';

const initialState = {
  myFriends: [] as any[],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const addFriend = createAsyncThunk('friends/addFriend', async (friendData: any) => {
  try {
    const response = await myFriendsService.addFriend(friendData);
    return response;
  } catch (error) {
    console.log(`${error}`);
    throw error;
  }
});

export const getMyFriends = createAsyncThunk('friends/getMyFriends', async () => {
  try {
    const response = await myFriendsService.getMyFriends();
    return response;
  } catch (error) {
    console.log(`${error}`);
    throw error;
  }
});

export const removeFriend = createAsyncThunk('friends/removeFriend', async (friendData: any) => {
  try {
    const response = await myFriendsService.removeFriend(friendData);
    return response;
  } catch (error) {
    console.log(`${error}`);
    throw error;
  }
});

export const myFriendsSlice = createSlice({
  name: 'myFriends',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFriend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFriend.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myFriends.push(action.payload);
      })
      .addCase(addFriend.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getMyFriends.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyFriends.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myFriends = action.payload;
      })
      .addCase(getMyFriends.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(removeFriend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFriend.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myFriends = state.myFriends.filter((item) => item.user_id !== action.payload.friendId);
      })
      .addCase(removeFriend.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = myFriendsSlice.actions;
export default myFriendsSlice.reducer;
