import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { ConnectKitButton } from 'connectkit';
import { Hero } from '../../components/Hero';
import { Header } from '../../components/Header';
import { Subscriptions } from '../../components/Subscriptions';
import Layout from '../../components/Layout';
import { UsersSideNav } from '~~/components/UsersSideNav';
import { gql, useQuery } from 'urql';

const TodosQuery = gql`
{
    planCreateds {
      id
      name
      planId
      blockNumber
      blockTimestamp
      duration
      price
      transactionHash
    }
  }
`;


const Home: NextPage = () => {

    const [result, reexecuteQuery] = useQuery({
        query: TodosQuery,
      });
    
      const { data, fetching, error } = result;
      console.log(data);
      if (fetching) return <p>Loading...</p>;
      if (error) return <p>Oh no... {error.message}</p>;


    return (
        <div>
            <Head>
                <title>Multi Pay</title>
                <meta
                    content="Generated by @rainbow-me/create-rainbowkit"
                    name="description"
                />
                <link href="/favicon.ico" rel="icon" />
            </Head>
            <main>
                <Layout>
                    <Subscriptions />
                </Layout>
            </main>
        </div>
    );
};

export default Home;
