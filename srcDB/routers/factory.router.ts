// src/routes/baseRouter.ts
import { RunResult } from 'better-sqlite3';
import express, { Request, Response } from 'express';
import { db } from '../database';
import { generateObjectId } from '../helpers/helper';
import { DatabaseObject, ObjectId } from '../model/dataModels';

export function createBaseRouter<T extends DatabaseObject>(tableName: string, parseData: (data: any | any[]) => T[]): express.Router {
  const router = express.Router();

  // CREATE
  router.post('/', (req: Request, res: Response) => {
    const data = req.body;
    const id: ObjectId = generateObjectId();
    const keys: string[] = Object.keys(data);
    const placeholders: string = keys.map(() => '?').join(',');
    const values: unknown[] = Object.values(data);
    const sql: string = `INSERT INTO ${tableName} (id, ${keys.join(',')}) VALUES (?, ${placeholders})`;

    const result: RunResult = db.prepare(sql).run(id, ...values);
    if (result.changes === 0) {
      return res.status(500).json({ error: 'Failed to create object' });
    } else {
      return res.status(200).json(parseData(data));
    }
  });

  // READ ALL (and optional ?ids=)
  router.get('/', (req: Request, res: Response) => {
    const idsParam: string = req.query.ids as string;
    if (idsParam) {
      const ids: string[] = idsParam.split(',');
      const placeholders: string = ids.map(() => '?').join(',');
      const sql: string = `SELECT * FROM ${tableName} WHERE id IN (${placeholders})`;

      const rows: unknown[] = db.prepare(sql).all(...ids);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'No objects found for the provided IDs' });
      } else if (rows.length > 0 && rows.length !== ids.length) {
        return res.status(206).json({ warning: 'Some objects were not found for the provided IDs', data: parseData(rows) });
      } else {
        return res.status(200).json(parseData(rows));
      }
    }

    const rows = db.prepare(`SELECT * FROM ${tableName}`).all();
    return res.status(200).json(parseData(rows));
  });

  // READ ONE
  router.get('/:id', (req: Request, res: Response) => {
    const data: unknown = db.prepare(`SELECT * FROM ${tableName} WHERE id = ?`).get(req.params.id);
    if (!data) {
      return res.status(404).json({ error: 'Object not found' });
    }
    return res.status(200).json(data);
  });

  // UPDATE
  router.put('/:id', (req: Request, res: Response) => {
    const data: any = req.body;
    const keys: string[] = Object.keys(data);
    const assignments: string = keys.map(k => `${k} = ?`).join(', ');
    const values: unknown[] = Object.values(data);
    const sql: string = `UPDATE ${tableName} SET ${assignments} WHERE id = ?`;

    const result: RunResult = db.prepare(sql).run(...values, req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Object not found or no changes made' });
    }
    return res.status(200).json({ id: req.params.id, ...data });
  });

  // DELETE
  router.delete('/:id', (req: Request, res: Response) => {
    const result: RunResult = db.prepare(`DELETE FROM ${tableName} WHERE id = ?`).run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Object not found or could not delete' });
    }
    return res.status(200).json({ id: req.params.id });
  });

  return router;
}
