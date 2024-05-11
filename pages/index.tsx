import { FC } from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import prisma from '../lib/prisma'
import { useSession } from "next-auth/react"
import Onboarding from "../components/Onboarding"

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return { 
    props: { feed }, 
    revalidate: 10 
  }
}

type Props = {
}

const Blog: FC<Props> = (props) => {
  const { data: session, status } = useSession();
  console.log(session, status);
  return (
    <Layout>
      {status === "authenticated" ? (
        // @ts-ignore
        session.user?.first_log_in ? (
          <Onboarding />
        ) : (
          <h1>Blog</h1>
        )) : (
          <h1>Welcome to FacturaScope</h1>
        )
      }
    </Layout>
  )
}

export default Blog
