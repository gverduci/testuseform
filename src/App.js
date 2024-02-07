import { FormProvider } from "react-hook-form";
import { usePersonForm } from "./hooks/usePersonForm";
import { AppBar, Box, Icon, IconButton, Toolbar, Typography } from "@mui/material";
import Contacts from "./components/contacts";
import PersonData from "./components/personData";

function App() {
  const { onSubmitHandler, useFormApi } = usePersonForm();
  const handleOnClick = (evt) => {
    // Download the serialized Person object
    const person = useFormApi.getValues();
    const blob = new Blob([JSON.stringify(person)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'person.json';
    a.click();
    URL.revokeObjectURL(url);

  };

  return (
    <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Person Form</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit" onClick={(evt) => handleOnClick(evt)}><Icon>download</Icon></IconButton>
      </Toolbar>
    </AppBar>

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
    </>
  );
}

export default App;
