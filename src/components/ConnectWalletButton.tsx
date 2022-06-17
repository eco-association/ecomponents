import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import Button, { Intent, Kind } from "./Button";

type ConnectWalletButtonProps = {
  intent: Intent;
  kind: Kind;
};

const ConnectWalletButton = ({ intent, kind }: ConnectWalletButtonProps) => {
  const [isUnsupportedChain, setIsUnsupportedChain] = useState(false);

  useEffect(() => {
    if (isUnsupportedChain) {
      toast.error("Unsupported Chain");
    }
  }, [isUnsupportedChain]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        if (!mounted || !account || !chain) {
          return (
            <Button
              intent={intent}
              kind={kind}
              label="Connect Wallet"
              onClick={openConnectModal}
            />
          );
        }

        if (chain.unsupported) {
          setIsUnsupportedChain(true);
          return (
            <Button
              intent={intent}
              kind={kind}
              label="Switch Networks"
              onClick={openChainModal}
              type="button"
            />
          );
        }

        return (
          <div className="flex gap-3">
            <Button intent={intent} kind={kind} onClick={openChainModal}>
              <>
                {chain.hasIcon && chain.iconUrl && (
                  <img
                    alt={chain.name || "Chain icon"}
                    src={chain.iconUrl}
                    className="w-3 h-3 mr-1"
                  />
                )}
                {chain.name}
              </>
            </Button>

            <Button intent={intent} kind={kind} onClick={openAccountModal}>
              {account.displayName}
              {account.displayBalance ? ` (${account.displayBalance})` : ""}
            </Button>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWalletButton;
