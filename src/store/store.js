import { configureStore } from '@reduxjs/toolkit'
import personReducer from './personSlice'
import contactReducer from './contactSlice'

export const store = configureStore({
  reducer: {
    person: personReducer,
    contact: contactReducer,
  },
})
