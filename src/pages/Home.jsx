import useContactReducer from "../hooks/useContactReducer.jsx";
import ContactList from "../components/ContactList.jsx";

export const Home = () => {
  const { store, dispatch } = useContactReducer();

  return (
    <div className="text-center mt-5 ">
      <ContactList />
    </div>
  );
};
