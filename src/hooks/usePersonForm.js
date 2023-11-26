import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useFormUpdater } from "./useFormUpdater";
import { usePersonUpdater } from "./usePersonUpdater";
import { useSelector, useDispatch, batch } from "react-redux";
import { assignPerson } from "../store/personSlice";
import { assignContact } from "../store/contactSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const personSchema = yup
  .object({
    name: yup.string().required(),
    // add email with regex
    email: yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Email is not valid").required(),
    // add phone with regex, permit digits, dashes, spaces, parentheses and plus
    phone: yup.string().matches(/^[0-9-()+ ]+$/, "Phone number is not valid"),
    // add website check with url regex
    website: yup.string().url("Website is not valid"),
  })
  .required();

export function usePersonForm() {
  const dispatch = useDispatch();

  const person = useSelector((state) => state.person || { name: "", email: "" });

  const PersonAction = useCallback(
    (data) => {
      batch(() => {
        dispatch(assignPerson(data));
        dispatch(assignContact(data));
      });
    },
    [dispatch]
  );

  const useFormApi = useForm({
    defaultValues: person,
    mode: "onChange",
    delayError: 1000,
    resolver: yupResolver(personSchema),
  });

  const { handleSubmit } = useFormApi;

  /* Data source updaters */
  // update the FORM => WHY? change comes from "book" prop
  useFormUpdater(person, useFormApi.setValue);
  // update the STORE => WHY? change comes from the "form"
  usePersonUpdater(useFormApi, PersonAction);

  const onSubmitHandler = useCallback(() => {
    return handleSubmit(PersonAction);
  }, [handleSubmit, PersonAction]);

  return {
    onSubmitHandler,
    useFormApi,
  };
}
