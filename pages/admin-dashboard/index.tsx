import { FC } from "react";
import AdminDashboardTable from "../../components/AdminDashboardTable";
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
      <AdminDashboardTable />
    </Layout>
  );
};

export default Dashboard;
