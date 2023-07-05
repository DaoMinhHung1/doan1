import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import devicesReducer from "./devicesSlice";
import servicesReducer from "./servicesSlice";
import ordernumbersReducer from "./ordernumbersSlice";
// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  devices: devicesReducer,
  servies: servicesReducer,
  ordernumbers: ordernumbersReducer,
  // Các reducer khác
});

// Configure store
const store = configureStore({
  reducer: rootReducer,
  // Cấu hình khác của store (nếu có)
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
