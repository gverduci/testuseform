import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormUpdater } from "./useFormUpdater";
import { usePersonUpdater } from "./usePersonUpdater";
import { useSelector, useDispatch, batch } from "react-redux";
import { assignPerson } from "../store/personSlice";
import { assignContact } from "../store/contactSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const personSchema = yup.object(
  {
    surname: yup.string().required(),
    // add email with regex
    email: yup
      .string()
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Email is not valid")
      .required(),
    // add phone with regex, permit digits, dashes, spaces, parentheses and plus
    phone: yup.string().matches(/^[0-9-()+ ]+$/, "Phone number is not valid"),
    // add website check with url regex
    website: yup.string().url("Website is not valid"),
  }
).shape(
  {
    name: yup.string().notRequired(),
    secondaryName: yup
      .string()
      .when(["name", "secondaryName"], {
        is: (name, secondaryName) => !name && !!secondaryName,
        then: (schema) => schema.length(0, "use name before secondaryName"),
      })
      .when(["name", "secondaryName"], ([name, secondaryName], schema) =>
       !!name && !!secondaryName && name.trim() === secondaryName.trim() ? schema.length(0, "secondaryName must be different from name") : schema,
    ),
  },
  [["secondaryName", "secondaryName"]]
);
export function usePersonForm() {
  const dispatch = useDispatch();

  const person = useSelector(
    (state) => state.person || { name: "", email: "" }
  );

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
    delayError: 500,
    resolver: yupResolver(personSchema),
  });

  const { handleSubmit, trigger } = useFormApi;

  useEffect(() => {
    trigger();
 }, [trigger]);

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
