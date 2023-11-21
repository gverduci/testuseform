import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  surname: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  company: '',
  title: '',
  notes: '',
  birthday: '',
  website: '',
}

export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    assign: (state, action) => {
      state.name = action.payload
    },
  },
})

export const { assign } = personSlice.actions

export default personSlice.reducer