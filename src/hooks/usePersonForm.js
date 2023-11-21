import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useFormUpdater } from "./useFormUpdater";
import { usePersonUpdater } from "./usePersonUpdater";
import { useSelector, useDispatch } from "react-redux";
import { assign } from "../store/personSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const personSchema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

export function usePersonForm() {
  const dispatch = useDispatch();

  const person = useSelector((state) => state.person || { name: "" });

  const PersonAction = useCallback(
    (data) => dispatch(assign(data.name)),
    [dispatch]
  );

  const useFormApi = useForm({
    defaultValues: person,
    mode: "onChange",
    delayError: 1000,
    resolver: yupResolver(personSchema)
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
