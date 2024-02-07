import { render, renderHook, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { expect as expect2 } from 'expect';
import Contacts from "../../components/contacts";
import { personInitialState } from "../../store/personSlice";

describe("Contacts", () => {
  function areStringEquals(a, b) {
    const aTrimmed = a && a.trim();
    const bTrimmed = b && b.trim();
  
    if (aTrimmed === bTrimmed) {
      return true;
    }
    return false;
  }

  beforeAll(() => {
    // eslint-disable-next-line no-undef, no-unused-expressions
    globalThis[Symbol.for('$$jest-matchers-object')].customEqualityTesters= [];
    expect2.addEqualityTesters([areStringEquals]);
  });
  
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

  test("check disabled fields", () => {
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

    const zipInput = screen.getByLabelText("Zip");
    expect(zipInput).toBeDisabled();
    const countryInput = screen.getByLabelText("Country");
    expect(countryInput).not.toBeDisabled();
  });

  test("check enabled fields", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { 
          ...personInitialState,
          state: "test State" },
      })
    );
    render(
      <FormProvider {...result.current}>
        <Contacts />
      </FormProvider>
    );

    const zipInput = screen.getByLabelText("Zip");
    expect(zipInput).not.toBeDisabled();
    const countryInput = screen.getByLabelText("Country");
    expect(countryInput).not.toBeDisabled();
  });
});
