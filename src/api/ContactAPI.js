const BASE_URL = "https://playground.4geeks.com/contact";

export const getContacts = async (slug) => {
  const response = await fetch(`${BASE_URL}/agendas/${slug}/contacts`);
  return response.json();
};

export const createContact = async (slug, contact) => {
  const response = await fetch(`${BASE_URL}/agendas/${slug}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  return response.json();
};

export const updateContact = async (id, contactData, slug) => {
  try {
    const response = await fetch(`${BASE_URL}/agendas/${slug}/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al actualizar el contacto:", error);
  }
};

export const deleteContact = async (slug, id) => {
  const response = await fetch(`${BASE_URL}/agendas/${slug}/contacts/${id}`, {
    method: "DELETE",
  });

  // Si no hay contenido, no intentes parsear json
  if (response.status === 204) {
    return { success: true };
  }

  // Si la respuesta no es exitosa y no es 204, intenta parsear JSON para mensaje de error
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al borrar contacto");
  }

  return response.json();
};
