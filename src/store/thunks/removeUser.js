import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeUser = createAsyncThunk("users/remove", async (user) => {
    await axios.delete(`http://localhost:3005/users/${user.id}`);

    //returning empty object
    // return response.data;
    return user;
});

export { removeUser };
