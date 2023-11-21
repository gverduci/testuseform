import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { usePersonForm } from "./hooks/usePersonForm";
import { Box, Typography } from "@mui/material";

function App() {
  const { onSubmitHandler, useFormApi } = usePersonForm();

  return (
    <Box marginLeft="5%" marginTop="5%">
      <Typography variant="h4">Person</Typography>
      <form onSubmit={onSubmitHandler}>
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
        {/* <input type="submit" /> */}
      </form>
    </Box>
  );
}

export default App;
