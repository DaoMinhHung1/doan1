import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs, getFirestore } from "firebase/firestore";

interface DeviceData {
  matb: string;
  nametb: string;
  addresstb: string;
  hoatdongtb: string;
  ketnoitb: string;
  dichvutb: string;
  id: string;
}

interface DeviceState {
  devices: DeviceData[];
  loading: boolean;
  error: string | null;
}

export const fetchDevices = createAsyncThunk(
  "devices/fetchDevices",
  async () => {
    try {
      const db = getFirestore();
      const devicesCollection = collection(db, "devices");

      const querySnapshot = await getDocs(devicesCollection);
      const devicesData: DeviceData[] = [];

      querySnapshot.forEach((doc) => {
        const device = doc.data() as DeviceData;
        devicesData.push(device);
      });

      return devicesData;
    } catch (error) {
      throw new Error("Error fetching device data");
    }
  }
);

const initialState: DeviceState = {
  devices: [],
  loading: false,
  error: null,
};

export const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDevices.fulfilled,
        (state, action: PayloadAction<DeviceData[]>) => {
          state.loading = false;
          state.devices = action.payload;
        }
      )
      .addCase(fetchDevices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching devices";
      });
  },
});

export const { actions: deviceActions } = deviceSlice; // Gán actions cho deviceActions

export default deviceSlice.reducer;
