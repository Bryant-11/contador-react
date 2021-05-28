const Contador = () => {
  //mi estado
  //la segunda posision es mi modificador
  //elprefijo set es para decir que es el modificador de mi estado
  const [contador, setContador] = React.useState(0);
  const aumentar = () => setContador(contador + 1);
  const disminuir = () => setContador(contador - 1);

  return (
    <div>
      <h1 className={contador <= 0 ? "menor" : "mayor"}>
        Contador : {contador}
      </h1>
      <hr />
      <button onClick={aumentar}>Aumentar</button>
      <button onClick={disminuir}>Disminuir</button>
    </div>
  );
};
