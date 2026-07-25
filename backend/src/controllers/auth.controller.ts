import type { Request, Response } from 'express';
import { loginSchema } from '../validators/schemas';
import { signToken, createUser, findUserByEmail, verifyPassword } from '../services/auth.service';

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Données invalides', issues: parsed.error.issues });
    return;
  }

  const user = await findUserByEmail(parsed.data.email);

  if (!user) {
    res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    return;
  }

  const passwordValid = await verifyPassword(parsed.data.password, user.password);

  if (!passwordValid) {
    res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    return;
  }

  const token = signToken({ sub: user.id, email: user.email });
  res.json({ token, email: user.email });
}

export async function register(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ message: 'Données invalides', issues: parsed.error.issues });
    return;
  }

  const existing = await findUserByEmail(parsed.data.email);

  if (existing) {
    res.status(409).json({ message: 'Un compte existe déjà avec cet email' });
    return;
  }

  const user = await createUser(parsed.data.email, parsed.data.password);
  const token = signToken({ sub: user.id, email: user.email });

  res.status(201).json({ token, email: user.email });
}