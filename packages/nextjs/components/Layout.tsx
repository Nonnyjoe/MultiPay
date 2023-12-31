import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from './Header';
import React, { Component, createContext, useState } from 'react';



const Layout = ({children}: any) => {

    const [smartAccount, setSmartAccount] = useState();
    const [provider, setProvider] = useState("ProPro");


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
                {children}
            </main>
        </div>
    );
};

export default Layout;
