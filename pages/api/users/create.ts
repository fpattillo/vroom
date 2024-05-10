import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import crypto from "crypto";
import bcrypt from "bcrypt";
import axios from "axios";

const ZAPPIER_EMAIL_GENERATOR_URL = "https://hooks.zapier.com/hooks/catch/7512145/3jf74p5/"

function generateRandomPassword(length: number): string {
  return crypto.randomBytes(length).toString("hex");
}

// Función para encriptar la contraseña
async function encryptPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { company, email, amount, pandadoc, currency, name } = req.body;
    if (!company || !email || !amount || !pandadoc || !name) {
      throw new Error("Company, email, amount, pandadoc are required");
    }
    const password = generateRandomPassword(16);
    const hashedPassword = await encryptPassword(password);
    await prisma.user.create({
      data: {
        name,
        company,
        email,
        amount: parseFloat(amount),
        pandadoc,
        role: "CLIENT",
        currency,
        password: hashedPassword,
      },
    });
    axios.post(ZAPPIER_EMAIL_GENERATOR_URL, {
      company,
      email,
      password,
      name,
    });
    res.json({ message: "Hello" });
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
};
