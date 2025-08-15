//Muestra la agenda actual así como todas las disponibles y la posibilidad de crear una agenda nueva

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useContactReducer from "../hooks/useContactReducer";

import { useState, useEffect } from "react";
import { getAgendas, createAgenda } from "../api/AgendaAPI";

export const Navbar = () => {
  const location = useLocation();
  const { store, dispatch } = useContactReducer();
  const [newAgenda, setNewAgenda] = useState("");

  //Fetch agendas
  const fetchAgendas = async () => {
    const response = await getAgendas();
    console.log(response);
    dispatch({ type: "GET_AGENDAS", payload: response.agendas });
  };

  //setAgenda
  const setAgenda = (agenda) => {
    dispatch({ type: "SET_AGENDA", payload: agenda });
  };

  //Add agenda
  const addAgenda = async () => {
    if (newAgenda.trim() === "") {
      alert("Please enter a valid agenda name.");
      return;
    }
    const response = await createAgenda(newAgenda);
    dispatch({ type: "ADD_AGENDA", payload: response });
    setNewAgenda("");
  };

  useEffect(() => {
    fetchAgendas();
  }, []);

  return (
    <nav className="navbar navbar-light nav-style justify-content-between rounded-5 d-flex p-3 d-flex m-3 mx-auto">
      {location.pathname !== "/" ? (
        <Link to="/" className="btn my-btn mx-5">
          Atrás
        </Link>
      ) : null}
      <ul className="nav-item dropdown  m-0">
        <a
          className="nav-link dropdown-toggle agenda-select rounded"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {store.slug.length > 0 ? store.slug : "Seleccionar agenda"}
        </a>
        <ul className="dropdown-menu">
          {Array.isArray(store.agendas) &&
            store.agendas.map((agenda) => (
              <li
                key={agenda.slug}
                onClick={() =>
                  dispatch({ type: "SET_AGENDA", payload: agenda.slug })
                }
              >
                <a className="dropdown-item">{agenda.slug}</a>
              </li>
            ))}
          <div className="d-flex">
            <input
              type="text"
              placeholder="Añadir"
              className="form-control ms-2 me-1"
              value={newAgenda}
              onChange={(e) => setNewAgenda(e.target.value)}
            />
            <button className="btn btn-success me-2" onClick={addAgenda}>
              +
            </button>
          </div>
        </ul>
      </ul>
      <Link to="/form" className="btn my-btn mx-5">
        Crear contacto
      </Link>
    </nav>
  );
};
