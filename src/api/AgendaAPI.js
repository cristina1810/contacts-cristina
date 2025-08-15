const BASE_URL = "https://playground.4geeks.com/contact";

export const getAgendas = async () => {
  const response = await fetch(`${BASE_URL}/agendas`);
  return response.json();
};

export const createAgenda = async (slug) => {
  const response = await fetch(`${BASE_URL}/agendas/${slug}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug }),
  });
  return response.json();
};
