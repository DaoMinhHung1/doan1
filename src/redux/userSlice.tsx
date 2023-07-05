import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

interface UserState {
  isLoggedIn: boolean;
  username: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  username: null,
  loading: false,
  error: null,
};

export const loginUserAsync = createAsyncThunk(
  "user/login",
  async (accountData: { email: string; password: string }, thunkAPI) => {
    try {
      const auth = getAuth();
      const { email, password } = accountData;

      await signInWithEmailAndPassword(auth, email, password);

      return { isLoggedIn: true, username: email };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);

export const logoutUserAsync = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      const auth = getAuth();
      const userData = JSON.parse(localStorage.getItem("userData") || "");

      if (userData) {
        userData.condition = "Ngừng hoạt động";

        const userToUpdateRef = ref(getDatabase(), `users/${userData.id}`);
        try {
          await set(userToUpdateRef, userData);
        } catch (error) {
          console.log("Error updating user status:", error);
          // Handle error if necessary
        }
      }

      localStorage.removeItem("userData");

      await signOut(auth);

      return {};
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string }>) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isLoggedIn = true;
        state.username = action.payload.username;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.isLoggedIn = false;
        state.username = null;
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
