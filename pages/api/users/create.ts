
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  
  try {
    const {company, email, amount, pandadoc, title, currency} = req.body;
    if (!company || !email || !amount || !pandadoc || !title) {
      throw new Error('Company, email, amount, pandadoc and title are required');
    }
    const computedCurrency = currency ?? (title as string).split('[').pop().split(']')[0];
    await prisma.user.create({
      data: {
        company,
        email,
        amount,
        pandadoc,
        role: 'CLIENT',
        currency: computedCurrency,
      }
    })
    res.json({ message: 'Hello' })
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
};