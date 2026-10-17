import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'KannadaConnect API',
    uptimeSeconds: Math.round(process.uptime()),
    database: {
      status: dbStatusMap[dbState] || 'unknown',
      stateCode: dbState
    }
  });
});

export default router;
