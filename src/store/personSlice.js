import { createSlice } from '@reduxjs/toolkit'
import { Person } from '../models/person';

export const personInitialState = Person.initialState;

export const personSlice = createSlice({
  name: 'person',
  initialState: personInitialState,
  reducers: {
    assignPerson: (state, action) => {
      state.name = action.payload.name;
      state.secondaryName = action.payload.secondaryName;
      state.surname = action.payload.surname;
      state.email = action.payload.email;
      state.title = action.payload.title;
      state.notes = action.payload.notes;
      state.birthday = action.payload.birthday;
    },
  },
})

export const { assignPerson } = personSlice.actions

export default personSlice.reducer