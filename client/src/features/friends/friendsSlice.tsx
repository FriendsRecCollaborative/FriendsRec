import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import friendsService from './friendsService';

const initialState = {
  friends: [] as any[],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

// export const addFriend = createAsyncThunk('friends/addFriend', async (friendData: any) => {
//   try {
//     const response = await friendsService.addFriend(friendData);
//     console.log('add', response);
//     return response;
//   } catch (error) {
//     console.log(`${error}`);
//     throw error;
//   }
// });

export const getFriends = createAsyncThunk('friends/getFriends', async () => {
  try {
    const response = await friendsService.getFriends();
    return response;
  } catch (error) {
    console.log(`${error}`);
    throw error;
  }
});

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // .addCase(addFriend.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(addFriend.fulfilled, (state, action: PayloadAction<any>) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.friends.push(action.payload);
      // })
      // .addCase(addFriend.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      // })
      .addCase(getFriends.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFriends.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.friends = action.payload;
      })
      .addCase(getFriends.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default friendsSlice.reducer;
