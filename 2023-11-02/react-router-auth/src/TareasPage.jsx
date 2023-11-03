import { useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import axios from "axios";

export const TareasPage = () => {
  const { sesion } = useAuthContext();
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/personas/${sesion.personaId}/tareas`, {
        headers: { Authorization: `Bearer ${sesion.token}` },
      })
      .then((response) => setTareas(response.data));
  }, [sesion]);

  return (
    <>
      <h2>Tareas</h2>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            {tarea.descripcion} {tarea.lista ? "✔️" : "❌"}
          </li>
        ))}
      </ul>
    </>
  );
};
