import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs, getFirestore } from "firebase/firestore";

interface OrderNumberData {
  STT: string;
  namekh: string;
  namedv: string;
  startdate: string;
  enddate: string;
  provide: string;
  id: string;
  isActive: boolean;
}

interface OrderNumberState {
  orderNumbers: OrderNumberData[];
  loading: boolean;
  error: string | null;
}

export const fetchOrderNumbers = createAsyncThunk(
  "orderNumbers/fetchOrderNumbers",
  async () => {
    try {
      const db = getFirestore();
      const orderNumbersCollection = collection(db, "ordernumbers");

      const querySnapshot = await getDocs(orderNumbersCollection);
      const orderNumbersData: OrderNumberData[] = [];

      querySnapshot.forEach((doc) => {
        const orderNumber = doc.data() as OrderNumberData;
        orderNumbersData.push(orderNumber);
      });

      return orderNumbersData;
    } catch (error) {
      throw new Error("Error fetching order number data");
    }
  }
);

const initialState: OrderNumberState = {
  orderNumbers: [],
  loading: false,
  error: null,
};

export const orderNumberSlice = createSlice({
  name: "orderNumbers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderNumbers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderNumbers.fulfilled,
        (state, action: PayloadAction<OrderNumberData[]>) => {
          state.loading = false;
          state.orderNumbers = action.payload;
        }
      )
      .addCase(fetchOrderNumbers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching order numbers";
      });
  },
});

export const { actions: orderNumberActions } = orderNumberSlice; // Gán actions cho orderNumberActions

export default orderNumberSlice.reducer;
