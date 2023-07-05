import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs, getFirestore } from "firebase/firestore";

interface ServiceData {
  madv: string;
  namedv: string;
  motadv: number;
  hoatdongdv: string;
  id: string;
}

interface ServiceState {
  services: ServiceData[];
  loading: boolean;
  error: string | null;
}

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async () => {
    try {
      const db = getFirestore();
      const servicesCollection = collection(db, "services");

      const querySnapshot = await getDocs(servicesCollection);
      const servicesData: ServiceData[] = [];

      querySnapshot.forEach((doc) => {
        const service = doc.data() as ServiceData;
        servicesData.push(service);
      });

      return servicesData;
    } catch (error) {
      throw new Error("Error fetching service data");
    }
  }
);

const initialState: ServiceState = {
  services: [],
  loading: false,
  error: null,
};

export const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchServices.fulfilled,
        (state, action: PayloadAction<ServiceData[]>) => {
          state.loading = false;
          state.services = action.payload;
        }
      )
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching services";
      });
  },
});

export const { actions: serviceActions } = serviceSlice; // Gán actions cho serviceActions

export default serviceSlice.reducer;
