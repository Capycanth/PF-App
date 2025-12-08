import express from 'express';
import mongoose from 'mongoose';

export function createBaseRouter(schema: mongoose.Model<any>): express.Router {
  const router = express.Router();

  // GET all
  router.get('/', async (_req, res) => {
    try {
      const models = await schema.find();
      res.json(models);
    } catch (err) {
      console.error('Mongo GET error:', err);
      res.status(500).json({ error: (err as Error).message });
    }
  });

  // GET by ID
  router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }

      const doc = await schema.findById(id);

      if (!doc) {
        return res.status(404).json({ error: 'Document not found' });
      }

      return res.json(doc);
    } catch (err) {
      console.error('Mongo GET by ID error:', err);
      return res.status(500).json({ error: (err as Error).message });
    }
  });

  // POST
  router.post('/', async (req, res) => {
    try {
      const created = await schema.create(req.body);
      res.json(created);
    } catch (err) {
      console.error('Mongo POST error:', err);
      res.status(400).json({ error: (err as Error).message });
    }
  });

  // PUT
  router.put('/:id', async (req, res) => {
    try {
      const updated = await schema.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updated) {
        return res.status(404).json({ error: 'Document not found' });
      }
      return res.json(updated);
    } catch (err) {
      console.error('Mongo PUT error:', err);
      return res.status(400).json({ error: (err as Error).message });
    }
  });

  // DELETE
  router.delete('/:id', async (req, res) => {
    try {
      const deleted = await schema.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Document not found' });
      }
      return res.json({ message: 'Deleted' });
    } catch (err) {
      console.error('Mongo DELETE error:', err);
      return res.status(400).json({ error: (err as Error).message });
    }
  });

  return router;
}
