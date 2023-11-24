import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../requester";

const initialState = {
  data: [],
  isLoading: false,
  error: false,
};

export const getContributionsList = createAsyncThunk(
  "getContributionsList/get",
  async () => {
    const response = await API("test/calendar.json");
    return response.data;
  }
);
const graphPageSlice = createSlice({
  name: "graphPageSlice",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getContributionsList.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getContributionsList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(getContributionsList.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.error;
    });
  },
});

export default graphPageSlice.reducer;
