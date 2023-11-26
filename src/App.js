import { FormProvider } from "react-hook-form";
import { usePersonForm } from "./hooks/usePersonForm";
import { Box, Typography } from "@mui/material";
import Contacts from "./components/contacts";
import PersonData from "./components/personData";

function App() {
  const { onSubmitHandler, useFormApi } = usePersonForm();

  return (
    <Box marginLeft="5%" marginTop="5%">
      <Typography variant="h4">Person</Typography>
      {/*wrap the form element with a form provider */}
      <FormProvider {...useFormApi}>
        <form onSubmit={onSubmitHandler}>
          {/* use the personData component */}
          <PersonData />
          {/* use the contacs component */}
          <Contacts />
          {/* <input type="submit" /> */}
        </form>
      </FormProvider>
    </Box>
  );
}

export default App;
