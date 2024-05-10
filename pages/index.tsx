import { FC } from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import prisma from '../lib/prisma'

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
  return (
    <Layout>
      <div className="flex">
      </div>
    </Layout>
  )
}

export default Blog
