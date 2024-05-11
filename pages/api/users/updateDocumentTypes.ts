import prisma from "../../../lib/prisma";

export default async (req, res) => {
  if (req.method === 'POST') {
    const { docType, email } = req.body;
    try {
      await prisma.user.update({
        where: {email: email},
        data: {
          document_type: docType,
          first_log_in: false
        }
      })
      res.status(200).json({ message: 'SUCCESS' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed. Please use POST.' });
  }
}