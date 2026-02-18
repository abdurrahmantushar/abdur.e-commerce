import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
    order : []
}
const orderSlice = createSlice({
    name : 'order',
    initialState : initialValue,
    reducers : {
        handleOrder : (state , action)=>{
            state.order = [...action.payload]
        }
    }
})

export  const {handleOrder} = orderSlice.actions
export default orderSlice.reducer