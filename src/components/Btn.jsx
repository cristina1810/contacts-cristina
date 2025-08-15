//Botón genérico que contiene un onclick definido en el componente padre al igual que el icono
//EDITAR ESTILO

const Btn = ({ action, img, id }) => {
  return (
    <button className="btn " onClick={action}>
      {img}
    </button>
  );
};

export default Btn;
