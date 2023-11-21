import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { usePersonForm } from "./hooks/usePersonForm";
import { Box } from "@mui/material";

function App() {
  const { onSubmitHandler, useFormApi } = usePersonForm();

  return (
    <Box marginLeft="50%" marginTop="50%">
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
