//create a new react functional component for the contacts

// boiler plate for a functional component
import { Grid, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const Contacts = () => {
  // get data from the form FormProvider context
  const useFormApi = useFormContext();

  return (
    <div>
      <Grid container spacing={2} style={{ marginTop: '8px' }}>
        <Grid item xs={6}>
          <Controller
            control={useFormApi.control}
            name="phone"
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { invalid, isTouched, isDirty, error },
            }) => (
              <TextField
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                error={error}
                helperText={error?.message}
                label="Phone"
                variant="outlined"
                inputProps={{ "aria-invalid": error ? "true" : "false" }}
                FormHelperTextProps={{ "role": error ? "alert" : "" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={useFormApi.control}
            name="address"
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { invalid, isTouched, isDirty, error },
            }) => (
              <TextField
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                error={error}
                helperText={error?.message}
                label="Address"
                variant="outlined"
                inputProps={{ "aria-invalid": error ? "true" : "false" }}
                FormHelperTextProps={{ "role": error ? "alert" : "" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={useFormApi.control}
            name="city"
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { invalid, isTouched, isDirty, error },
            }) => (
              <TextField
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                error={error}
                helperText={error?.message}
                label="City"
                variant="outlined"
                inputProps={{ "aria-invalid": error ? "true" : "false" }}
                FormHelperTextProps={{ "role": error ? "alert" : "" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={useFormApi.control}
            name="state"
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { invalid, isTouched, isDirty, error },
            }) => (
              <TextField
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                error={error}
                helperText={error?.message}
                label="State"
                variant="outlined"
                inputProps={{ "aria-invalid": error ? "true" : "false" }}
                FormHelperTextProps={{ "role": error ? "alert" : "" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={useFormApi.control}
            name="zip"
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { invalid, isTouched, isDirty, error },
            }) => (
              <TextField
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                error={error}
                helperText={error?.message}
                label="Zip"
                variant="outlined"
                inputProps={{ "aria-invalid": error ? "true" : "false" }}
                FormHelperTextProps={{ "role": error ? "alert" : "" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={useFormApi.control}
            name="country"
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { invalid, isTouched, isDirty, error },
            }) => (
              <TextField
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                error={error}
                helperText={error?.message}
                label="Country"
                variant="outlined"
                inputProps={{ "aria-invalid": error ? "true" : "false" }}
                FormHelperTextProps={{ "role": error ? "alert" : "" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={useFormApi.control}
            name="website"
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { invalid, isTouched, isDirty, error },
            }) => (
              <TextField
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                error={error}
                helperText={error?.message}
                label="Website"
                variant="outlined"
                inputProps={{ "aria-invalid": error ? "true" : "false" }}
                FormHelperTextProps={{ "role": error ? "alert" : "" }}
              />
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Contacts;
