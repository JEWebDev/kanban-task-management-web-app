import { FormError } from "@/types/data";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
interface FormErrorContextType {
  errors: FormError | undefined;
  setErrors: Dispatch<SetStateAction<FormError | undefined>>;
}

const FormErrorContext = createContext<FormErrorContextType | undefined>(
  undefined,
);

export const FormErrorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [errors, setErrors] = useState<FormError | undefined>(undefined);

  return (
    <FormErrorContext.Provider value={{ errors, setErrors }}>
      {children}
    </FormErrorContext.Provider>
  );
};

export const useFormErrorContext = () => {
  const context = useContext(FormErrorContext);
  if (!context) {
    throw new Error(
      "useFormErrorContext should be called inside a FormErrorContextProvider",
    );
  }
  return context;
};
