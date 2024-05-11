import prisma from "../../../lib/prisma";

export default async (req: any) => {
  try {
    // change password logic
    const { password, email } = req.body;
    await prisma.user.update({
      where: {email: email},
      data: {
        password: password
      }
    })
  } catch (e) {
    console.error(e);
  }
}