import React, { useState } from "react";
import { createContact } from "../api/ContactAPI";
import useContactReducer from "../hooks/useContactReducer";
const ContactForm = () => {
  const { dispatch, store } = useContactReducer();

  // Inicializamos los input con valores vacios
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!store.slug) {
      console.error("Error: No se ha seleccionado una agenda.");
      return;
    }
    const data = await createContact(store.slug, formData);

    dispatch({ type: "ADD_CONTACT", payload: data });
    console.log("Contacto añadido");
    console.log(data);
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
    });
  };

  return (
    <form>
      <div className="row mb-3 m-3">
        <label htmlFor="inputName" className="col-sm col-form-label">
          Name:
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="inputName"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-3 m-3">
        <label htmlFor="inputPhone" className="col-sm col-form-label">
          Phone
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="inputPhone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-3 m-3">
        <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
          Email:
        </label>
        <div className="col-sm-10">
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
      </div>
      <div className="row mb-3 m-3">
        <label htmlFor="inputAddress" className="col-sm-2 col-form-label">
          Address:
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            name="address"
            onChange={handleChange}
            value={formData.address}
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn my-3 my-btn mx-auto d-flex"
        onClick={handleSubmit}
      >
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
