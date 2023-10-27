import express from "express";
import { db } from "./db.js";

/*
CREATE TABLE `tareas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) NOT NULL,
  `lista` tinyint NOT NULL,
  `persona_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_tareas_personas_persona_id_idx` (`persona_id`),
  CONSTRAINT `fk_tareas_personas_persona_id` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
)
*/

export const tareasRouter = express
  .Router()
  .get("/", async (req, res) => {
    const { lista, edad } = req.query;

    const generarWhere = () => {
      if (lista != null) {
        return "WHERE lista = :lista";
      }
      return "";
    };

    // Ejemplo con varias consultas
    /*
    const generarWhere = () => {
      let where = 'WHERE 1=1'
      if (lista != null) {
        where += " AND lista = :lista";
      }
      if (edad != null) {
        where += " AND edad = :edad";
      }
      return where;
    };

    */

    const [rows, fields] = await db.execute(
      `SELECT * FROM tareas ${generarWhere()}`,
      // Agregar 'edad'
      { lista }
    );

    res.send(rows);
  })
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    const [rows, fields] = await db.execute(
      "SELECT * FROM tareas WHERE id = :id",
      { id }
    );
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "Tarea no encontrada" });
    }
  })
  .get("/:id/persona", async (req, res) => {
    const { id } = req.params;
    const [rows, fields] = await db.execute(
      "SELECT p.id, p.apellido, p.nombre \
      FROM personas p \
      JOIN tareas t ON p.id = t.persona_id \
      WHERE t.id = :id",
      { id }
    );
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "Persona no encontrada" });
    }
  });
