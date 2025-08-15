import Contact from "./Contact.jsx";
import useContactReducer from "../hooks/useContactReducer.jsx";
import {
  getContacts,
  deleteContact,
  updateContact,
} from "../api/ContactAPI.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ModalForm from "./ModalForm.jsx";

const ContactList = () => {
  const { store, dispatch } = useContactReducer();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [selectedContactIndex, setSelectedContactIndex] = useState(null);

  const editContact = (id) => {
    navigate(`/contacts/${id}/edit`);
  };

  const removeContact = async (id) => {
    const response = await deleteContact(store.slug, id);
    console.log(response);
    dispatch({ type: "REMOVE_CONTACT", payload: id });
    console.log("Contact deleted successfully");
  };

  const showModal = (index) => {
    setSelectedContactIndex(index);
    setModal(true);
  };

  const handleEditSave = async (updatedContact, id) => {
    const data = await updateContact(id, updatedContact, store.slug);
    console.log("Contact updated:", data);
    dispatch({
      type: "EDIT_CONTACT",
      payload: { index: selectedContactIndex, contact: updatedContact },
    });

    setModal(false); // Cierra el modal al guardar
  };

  useEffect(() => {
    const fetchContacts = async () => {
      if (!store.slug) return; // No cargamos si no hay agenda seleccionada
      const response = await getContacts(store.slug);
      console.log(response);
      dispatch({ type: "GET_CONTACTS", payload: response.contacts });
    };
    fetchContacts();
  }, [store.slug]);
  console.log(store.slug);

  return (
    <div className="d-flex row align-items-center m-3 justify-content-center contact-container mx-auto">
      {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
        store.contacts.map((contact, index) => (
          <Contact
            key={contact.id}
            contact={contact}
            editContact={() => showModal(index)}
            deleteContact={() => removeContact(contact.id)}
          />
        ))
      ) : (
        <p className="text-muted m-5">No contacts found.</p>
      )}
      {modal && (
        <ModalForm
          contact={store.contacts[selectedContactIndex]}
          onClose={() => setModal(false)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default ContactList;
