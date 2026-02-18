import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    allCategory : [],
    loadingState : false,
    allSubCategory : [],
    product : []
}

const productSlice = createSlice({
    name : 'product',
    initialState : initialValue,
    reducers : {
        setAllCategory : ( state,action)=>{
            state.allCategory = [...action.payload]
        },
        setLoadingState : (state , action)=>{ 
            state.loadingState = action.payload
        },
        setAllSubCategory : (state , action)=>{
            state.allSubCategory = [...action.payload]
        },
        setAllProduct : (state,action)=>{
            state.product = [...action.payload]
        }
    }
})

export  const { setAllCategory,setAllSubCategory,setAllProduct,setLoadingState} = productSlice.actions
export default productSlice.reducer