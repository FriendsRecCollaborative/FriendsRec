import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import newsfeedService from './newsfeedService';

interface NewsfeedItem {
  recs_id: number;
  user_id: number;
  restaurant_id: number;
  review: string;
  created_at: string;
}

interface NewsfeedState {
  newsfeed: NewsfeedItem[];
}

const initialState = {
  newsfeed: [],
  myReviews: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const getNewsfeed = createAsyncThunk('newsfeed/getAll', async () => {
  try {
    const response = await newsfeedService.getNewsfeed();
    return response;
  } catch (error) {
    console.log(`${error}`);
    throw error;
  }
});

export const getMyReviews = createAsyncThunk('friends/getMyReviews', async () => {
  try {
    const response = await newsfeedService.getMyReviews();
    return response;
  } catch (error) {
    console.log(`${error}`);
    throw error;
  }
});

export const newsfeedSlice = createSlice({
  name: 'newsfeed',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewsfeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNewsfeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.newsfeed = action.payload;
      })
      .addCase(getNewsfeed.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getMyReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyReviews.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myReviews = action.payload;
      })
      .addCase(getMyReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = newsfeedSlice.actions;
export default newsfeedSlice.reducer;
