import { Grid, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const PersonData = () => {
  // get data from the form FormProvider context
  const useFormApi = useFormContext();

  return (
    <div>
      {/* person fields */}
      {/* format the following fields inside a material ui grid with 2 column*/}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Controller
            control={useFormApi.control}
            name="name"
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
                label="Name"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={useFormApi.control}
            name="surname"
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
                label="Surname"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={useFormApi.control}
            name="email"
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
                label="Email"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={useFormApi.control}
            name="title"
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
                label="Title"
                variant="outlined"
              />
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default PersonData;
