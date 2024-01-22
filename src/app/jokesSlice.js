import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const JOKES_API = "https://v2.jokeapi.dev/joke/";

const initialState = {
  joke: {},
  status: "idle",
  error: null,
};
export const fetchJoke = createAsyncThunk(
  "jokes/fetchJoke",
  async (attribute) => {
    try {
      const response = await axios.get(JOKES_API + attribute);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
const jokesSlice = createSlice({
  name: "jokes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJoke.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJoke.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.joke = action.payload;
      })
      .addCase(fetchJoke.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.error.message;
      });
  },
});
export const getJoke = (state) => state.jokes.joke;
export const getJokeStatus = (state) => state.jokes.status;
export const getJokeError = (state) => state.jokes.error;

export default jokesSlice.reducer;
