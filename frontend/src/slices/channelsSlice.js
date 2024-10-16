import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import routes from "../routes";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

export const fetchChannels = createAsyncThunk(
  "channels/fetchChannels",
  async () => {
    const response = await axios.get(routes.channelsPath());
    console.log(response.data);
    return response.data;
  }
);

export const createChannel = createAsyncThunk(
  "channels/createChannel",
  async (data) => {
    const response = await axios.post(routes.channelsPath(), data);
    console.log(response.data);
    return response.data;
  }
);

export const removeChannel = createAsyncThunk(
  "channels/removeChannel",
  async (id) => {
    const response = await axios.delete(routes.channelPath(id), id);
    console.log(response.data);
    return response.data;
  }
);

export const updateChannel = createAsyncThunk(
  "channels/updateChannel",
  async (id) => {
    const response = await axios.patch(routes.channelPath(id), id);
    console.log(response.data);
    return response.data;
  }
);

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
    },
    updateChannel: (state, { payload }) => {
      channelsAdapter.updateOne(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, action) => {
      channelsAdapter.addMany(state, action);
    });
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
export const selectors = channelsAdapter.getSelectors(
  (state) => state.channels
);
