import { createSlice } from "@reduxjs/toolkit";

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + (d.getDate() + 1),
    year = d.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return [year, month, day].join("-");
}

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
      state.date = formatDate(action.payload);
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
