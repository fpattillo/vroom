import { useSession } from "next-auth/react";
import { FC } from "react";
import DashboardTable from "../../components/DashboardTable";
import Layout from "../../components/Layout";

type Props = {};

export const getStaticProps = async (context) => {
  return {
    props: {},
  };
};

const Dashboard: FC<Props> = (props) => {
  return (
    <Layout>
      <DashboardTable />
    </Layout>
  );
};

export default Dashboard;
