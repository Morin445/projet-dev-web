import type { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  logger.error({ err }, 'Unhandled error');
  res.status(500).json({ message: 'Erreur interne du serveur' });
}
