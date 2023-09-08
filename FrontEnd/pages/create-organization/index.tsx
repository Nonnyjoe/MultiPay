import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { ConnectKitButton } from 'connectkit';
import { Header } from '../../components/Header';
import { Subscribe } from '../../components/Subscribe';
import { CreateOrganization } from '../../components/CreateOrganization';

const Home: NextPage = () => {
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
                <Header />
                <CreateOrganization />
            </main>
        </div>
    );
};

export default Home;