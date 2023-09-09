import Head from "next/head";
import { CreateOrganization } from "../../components/CreateOrganization";
import Layout from "../../components/Layout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Multi Pay</title>
        <meta content="Generated by @rainbow-me/create-rainbowkit" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main>
        <Layout>
          <CreateOrganization />
        </Layout>
      </main>
    </div>
  );
};

export default Home;
