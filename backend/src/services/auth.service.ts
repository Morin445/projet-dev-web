import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { env } from '../config/env';
import { prisma } from '../lib/prisma';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: { sub: string; email: string }): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1d' });
}

export async function createUser(email: string, password: string) {
  const passwordHash = await hashPassword(password);

  return prisma.user.create({
    data: { email, password: passwordHash },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}