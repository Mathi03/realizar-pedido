import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./OrderSlice";
import personaReducer from "./PersonaSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    persona: personaReducer,
  },
});
