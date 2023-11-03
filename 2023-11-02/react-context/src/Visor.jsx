import { useCuentaContext } from "./CuentaContext";

export const Visor = () => {
  const { cuenta } = useCuentaContext();
  return (
    <>
      <p>Visor</p>
      <p>Cuenta: {cuenta}</p>
    </>
  );
};
