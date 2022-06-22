import React, { useState, useEffect } from "react";

import { useAccount } from "wagmi";

import { Header, ConnectWalletButton } from ".";

import { Route } from "./Header";

type LayoutType = {
  routes?: Route[];
  children: JSX.Element;
};

const Layout = ({ routes = [], children }: LayoutType) => {
  const [account, setAccount] = useState(null);

  const { data } = useAccount();

  useEffect(() => {
    setAccount(data);
  }, [data]);

  return (
    <>
      <Header routes={routes} />
      <div className="px-10 pt-4">
        {account ? (
          children
        ) : (
          <div className="flex text-xl justify-center">
            <ConnectWalletButton intent="none" kind="hollow" />
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;
