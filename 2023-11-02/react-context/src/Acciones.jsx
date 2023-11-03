import { useCuentaContext } from "./CuentaContext";

export const Acciones = () => {
  const { cuenta, setCuenta } = useCuentaContext();
  return (
    <>
      <p>Acciones</p>
      <button onClick={() => setCuenta(cuenta + 1)}>Incrementar</button>
      <button onClick={() => setCuenta(cuenta - 1)}>Decrementar</button>
    </>
  );
};
