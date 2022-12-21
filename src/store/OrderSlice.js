import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
  },
  reducers: {
    increment: (state, action) => {
      const { data } = action.payload;
      state.order.push(data);
    },
    decrement: (state, action) => {
      const sku = action.payload;
      let temp = state.order.filter((obj) => obj.sku !== sku);
      state.order = temp;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    cleanOrder: (state, action) => {
      state.order = [];
    },
  },
});

export const { increment, decrement, incrementByAmount, cleanOrder } = counterSlice.actions;

export default counterSlice.reducer;
