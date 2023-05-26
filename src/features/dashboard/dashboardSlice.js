import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
  unfoldableShow: true,
}
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSidebarShow: (state, action) => {
      state.sidebarShow = action.payload
    },
    setFoldableShow: (state, action) => {
      state.unfoldable = action.payload
    },
  },
})

export const { setSidebarShow, setFoldableShow } = dashboardSlice.actions

export default dashboardSlice.reducer
