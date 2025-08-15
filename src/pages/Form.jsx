import { Link } from "react-router-dom";
import useContactReducer from "../hooks/useContactReducer";
import ContactForm from "../components/ContactForm";

export const Form = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useContactReducer();

  return (
    <div className="container border form-style">
      <ContactForm />
    </div>
  );
};

export default Form;
