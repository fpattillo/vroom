
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  
  try {
    const {company, email, amount, pandadoc,  currency, name} = req.body;
    if (!company || !email || !amount || !pandadoc || !name) {
      throw new Error('Company, email, amount, pandadoc are required');
    }
    await prisma.user.create({
      data: {
        name,
        company,
        email,
        amount: parseFloat(amount),
        pandadoc,
        role: 'CLIENT',
        currency,
      }
    })
    res.json({ message: 'Hello' })
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
};