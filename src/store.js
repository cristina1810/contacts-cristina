export const initialStore = () => {
  return {
    slug: "",
    agendas: [],
    contacts: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "ADD_AGENDA":
      if (!action.payload || !action.payload.slug) {
        console.error("Payload inválido en ADD_AGENDA:", action.payload);
        return store; // evita romper la app
      }
      return {
        ...store,
        agendas: [...store.agendas, action.payload],
      };
    case "GET_AGENDAS":
      return {
        ...store,
        agendas: action.payload,
      };
    case "SET_AGENDA":
      return {
        ...store,
        slug: action.payload,
      };
    case "GET_CONTACTS":
      return {
        ...store,
        contacts: action.payload,
      };
    case "ADD_CONTACT":
      return {
        ...store,
        contacts: [...store.contacts, action.payload],
      };
    case "REMOVE_CONTACT":
      return {
        ...store,
        contacts: store.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    case "EDIT_CONTACT":
      console.log(action.payload);
      const updatedContacts = [...store.contacts];
      const oldContact = updatedContacts[action.payload.index];
      updatedContacts[action.payload.index] = {
        ...oldContact,
        ...action.payload.contact, // datos nuevos desde el formulario, preservando lo demás (imagen)
      };
      return {
        ...store,
        contacts: updatedContacts,
      };
    default:
      throw Error("Unknown action.");
  }
}
