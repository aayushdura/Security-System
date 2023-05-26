// install redux toolkit and redux

// in store.file
import { configureStore } from '@reduxjs/toolkit'
import userReducer from 'userSlice.js'

const store = configureStore({
    reducer: {
        user: userReducer, //userReducer is a slice for user
    },
})

// in index.js file
import store from store.js

ReactDOM.render(
    <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
  )
  
// in userSlice.js
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
 name:'user',
initialState:{
    currentUser: {}
},
reducers:{
    setCurrentUser :(state,action)=>{
        state.currentUser = action.payload
    }
}
})
export default userSlice.reducer
export const {setCurrentUser} = userSlice.actions 

// apiCall.js file

export const getCurrentUser = (payload) =>{
    return async function (dispatch){
        try{
        let res = await APICALL
        dispatch(setCurrentUser(res.data))  //setting currentuser info from API into redux store by dispatching 
        }catch(err){
            console.log(err)
        }
    }
}

// in react page or component 

import dispatch from 'react-redux'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const HomePage = ()=>{
    const {currentUser} = useSelector(state=>state.user)
    useEffect(()=>{
        dispatch(getCurrentUser(bearerToken||userCredential))
    })
    return (
        <h2>UserName : {currentUser?.username}</h2>
    )
}