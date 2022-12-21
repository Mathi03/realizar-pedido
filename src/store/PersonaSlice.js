import { createSlice } from "@reduxjs/toolkit";

export const personaSlice = createSlice({
  name: "persona",
  initialState: {
    partners: [],
    select: "",
  },
  reducers: {
    addPartners: (state, action) => {
      let data = action.payload;
      state.partners = data;
    },
    selectPartner: (state, action) => {
      state.select = action.payload;
    },
  },
});

export const { addPartners,selectPartner } = personaSlice.actions;

export default personaSlice.reducer;
