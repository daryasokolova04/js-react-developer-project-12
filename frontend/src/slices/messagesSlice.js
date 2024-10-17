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

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async () => {
    const response = await axios.get(routes.messagesPath());
    console.log(response.data);
    return response.data;
  }
);

export const createMessage = createAsyncThunk(
  "messages/createMessage",
  async (data) => {
    const response = await axios.post(routes.messagesPath(), data);
    console.log(response.data);
    return response.data;
  }
);

export const removeMessage = createAsyncThunk(
  "messages/removeMessage",
  async (id) => {
    const response = await axios.delete(routes.messagePath(id), id);
    console.log(response.data);
    return response.data;
  }
);

export const updateMessage = createAsyncThunk(
  "messages/updateMessage",
  async ({ id, data }) => {
    const response = await axios.patch(routes.messagePath(id), { data });
    console.log(response.data);
    return response.data;
  }
);

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    removeMessage: (state, { payload }) => {
      messagesAdapter.removeOne(state, payload);
    },
    updateMessage: (state, { payload }) => {
      messagesAdapter.updateOne(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        messagesAdapter.addMany(state, action.payload);
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        messagesAdapter.addOne(state, action.payload);
      })
      .addCase(removeMessage.fulfilled, (state, action) => {
        messagesAdapter.removeOne(state, action.payload);
      })
      .addCase(updateMessage.fulfilled, (state, action) => {
        messagesAdapter.updateOne(state, action.payload);
      });
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
export const selectors = messagesAdapter.getSelectors(
  (state) => state.messages
);
