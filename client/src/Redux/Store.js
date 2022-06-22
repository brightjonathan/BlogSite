import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Features/authSlice";
import TourReducer from "./Features/TourSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    tour: TourReducer,
  },
});

//484689996229-vl8afdecu2te0kremphnobmkh3lnhf6a.apps.googleusercontent.com'
