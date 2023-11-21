import { useDeepCompareEffect } from "react-use";

export const usePersonUpdater = (useFormApi, onChange) => {
  const personChanges = useFormApi.watch();
  const dirtyFields = useFormApi.formState.dirtyFields;

  const createPersonFromDirtyFields = (dirtyFields, changes) => {
    const keys = Object.keys(dirtyFields);
    if (keys.length > 0) {
      return keys.reduce((result, key) => {
        return {
          ...result,
          [key]: changes[key],
        };
      }, {});
    }
    return {name:""};
  };
  const isRecordEmpty = ({ hash, ...changes }) => {
    return Object.keys(changes)?.length === 0;
  };
  useDeepCompareEffect(() => {
    if (!isRecordEmpty(personChanges)) {
      const person = createPersonFromDirtyFields(dirtyFields, personChanges);
      if (person) onChange(person);
    }
  }, [personChanges]);
};
