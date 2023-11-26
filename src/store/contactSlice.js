import { createSlice } from "@reduxjs/toolkit";

export const contactsInitialState = {
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  website: "",
};

export const contactSlice = createSlice({
  name: "contact",
  initialState: contactsInitialState,
  reducers: {
    assignContact: (reduxState, action) => {
      const { email, phone, address, city, state, zip, country, website } =
        action.payload;
      reduxState.email = email;
      reduxState.phone = phone;
      reduxState.address = address;
      reduxState.city = city;
      reduxState.state = state;
      reduxState.zip = zip;
      reduxState.country = country;
      reduxState.website = website;
    },
  },
});

export const { assignContact } = contactSlice.actions;

export default contactSlice.reducer;
