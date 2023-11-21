import { useDeepCompareEffect } from "react-use"

export const useFormUpdater = (person, setValue) => {
  useDeepCompareEffect(() => {
    const setValueToKey = ([key, value]) => {
      setValue(key, value, { shouldDirty: false })
    }
    Object.entries(person).forEach(setValueToKey)
  }, [person, setValue])
}