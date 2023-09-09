import Head from "next/head";
import { Hero } from "../../components/Hero";
import Layout from "../../components/Layout";
import type { NextPage } from "next";
import { CompanySideNav } from "~~/components/CompanySideNav";

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
          <div className="flex flex-row">
            <CompanySideNav />
            <Hero />
          </div>
        </Layout>
      </main>
    </div>
  );
};

export default Home;
