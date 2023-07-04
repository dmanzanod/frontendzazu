import { createSlice } from "@reduxjs/toolkit";
const initialState={
    servicesStats: null,
    monthlyBookings: null,
    conversations: null,
    totalSales: null,
    periodSales: null,
    periodBookings: null,
    totalBookings: null,
    conversationsBookings: null,
    salesBookings:null
  }
const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImageStats: (state, action) => {
    //   switch (action.type) {
        
            console.log('gotToTheStats')
          state.servicesStats=action.payload ;
          
    },
    addImageTotalSales:(state,action)=>{
        state.totalSales=action.payload ;
    },
    addImagePeriodSales:(state,action)=>{
        state.periodSales=action.payload
    },
    addImageConversations:(state,action)=>{
        state.conversations=action.payload
    },
    addImageConversationsBookings:(state,action)=>{
        state.conversationsBookings=action.payload
    },
    addImageTotalBookings:(state,action)=>{
        state.totalBookings=action.payload
    },
    addImageMonthlyBookings:(state,action)=>{
        state.monthlyBookings=action.payload
    },
    addImagePeriodBookings:(state,action)=>{
        state.periodBookings=action.payload
    },
    addImageSalesBookings:(state,action)=>{
        state.salesBookings=action.payload
    }

       
    ,
    clearImages: (state) => {
        state={...initialState}
    },
  },
});

export const { addImageStats,addImageConversations,addImageConversationsBookings,addImageMonthlyBookings,addImagePeriodBookings,addImagePeriodSales,addImageTotalBookings,addImageTotalSales,addImageSalesBookings, clearImages } = imagesSlice.actions;
export const selectImages = (state)=>state
export default imagesSlice.reducer;
