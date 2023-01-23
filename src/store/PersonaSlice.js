import { createSlice } from "@reduxjs/toolkit";

export const personaSlice = createSlice({
  name: "persona",
  initialState: {
    partners: [],
    select: "",
    date: "",
  },
  reducers: {
    addPartners: (state, action) => {
      let data = action.payload;
      state.partners = data;
    },
    selectPartner: (state, action) => {
      state.select = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    cleanValues: (state, action) => {
      state.select = "";
      state.date = "";
    },
  },
});

export const { addPartners, selectPartner, setDate, cleanValues } =
  personaSlice.actions;

export default personaSlice.reducer;
