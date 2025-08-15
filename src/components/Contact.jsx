//Componente que representa cada contacto individual con los datos recogidos de la API
//Muestra información así como los botones para editar y borrar, cuyas funcionalidades
//se definen en el componente padre
//EDITAR ESTILO

import Btn from "./Btn";
import Avatar from "../assets/img/ContactImg.jpg";

const Contact = ({ deleteContact, editContact, contact }) => {
  return (
    <div className=" p-3 m-3 contact-card row">
      <div className="d-flex align-items-center">
        <img
          className="rounded-circle avatar"
          src={Avatar}
          alt="Contact Avatar"
        />
        <p className="contact-title ms-3">{contact.name}</p>
      </div>
      <hr className="hr hr-blurry" />
      <div className="align-items-start text-start">
        <p className="m-1">
          <i className="fa-solid fa-phone iconos"></i>{" "}
          <span className="ms-2 text-start">{contact.phone}</span>
        </p>
        <p className="m-1">
          <i className="fa-solid fa-envelope iconos"></i>{" "}
          <span className="ms-2">{contact.email}</span>
        </p>
        <p className="m-1">
          <i className="fa-solid fa-location-dot iconos"></i>{" "}
          <span className="ms-2">{contact.address}</span>
        </p>
      </div>
      <hr className="hr hr-blurry" />
      <div className="d-flex justify-content-center">
        <Btn
          action={editContact}
          id={contact.id}
          img={<i className="fa-solid fa-user-pen edit rounded-5"></i>}
        >
          editar
        </Btn>
        <Btn
          action={deleteContact}
          id={contact.id}
          img={<i className="fas fa-trash trash rounded-5"></i>}
        >
          borrar
        </Btn>
      </div>
    </div>
  );
};

export default Contact;
