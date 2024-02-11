import { FormProvider } from "react-hook-form";
import { usePersonForm } from "./hooks/usePersonForm";
import { AppBar, Box, Icon, IconButton, Toolbar, Typography } from "@mui/material";
import Contacts from "./components/contacts";
import PersonData from "./components/personData";
import { addPersons, delPersons } from "./db";

function App() {
  const { onSubmitHandler, useFormApi } = usePersonForm();
  const handleOnDownload = (evt) => {
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

  
    const handleOnSave = (evt) => {
      // Download the serialized Person object
      const person = useFormApi.getValues();
      addPersons([person]);
    };

    const handleOnDelete = (evt) => {
      // Download the serialized Person object
      const person = useFormApi.getValues();
      delPersons([person]);
    };

  return (
    <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Person Form</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit" onClick={(evt) => handleOnDownload(evt)}><Icon>download</Icon></IconButton>
        <IconButton color="inherit" onClick={(evt) => handleOnSave(evt)}><Icon>save</Icon></IconButton>
        <IconButton color="inherit" onClick={(evt) => handleOnDelete(evt)}><Icon>delete</Icon></IconButton>
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
