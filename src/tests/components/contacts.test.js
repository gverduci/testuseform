import { render, renderHook, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import Contacts from "../../components/contacts";
import { personInitialState } from "../../store/personSlice";

test("renders contacts form fields", () => {
  const { result } = renderHook(() =>
    useForm({
      defaultValues: personInitialState,
    })
  );
  render(
    <FormProvider {...result.current}>
      <Contacts />
    </FormProvider>
  );

  const phoneInput = screen.getByLabelText("Phone");
  expect(phoneInput).toBeInTheDocument();

  const addressInput = screen.getByLabelText("Address");
  expect(addressInput).toBeInTheDocument();

  const cityInput = screen.getByLabelText("City");
  expect(cityInput).toBeInTheDocument();

  const stateInput = screen.getByLabelText("State");
  expect(stateInput).toBeInTheDocument();

  const zipInput = screen.getByLabelText("Zip");
  expect(zipInput).toBeInTheDocument();

  const countryInput = screen.getByLabelText("Country");
  expect(countryInput).toBeInTheDocument();

  const websiteInput = screen.getByLabelText("Website");
  expect(websiteInput).toBeInTheDocument();
});
