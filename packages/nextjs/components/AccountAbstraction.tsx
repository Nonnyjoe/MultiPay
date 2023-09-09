import { useContext } from "react";
import { Button } from "./Button";
import clsx from "clsx";
import { SmartAccountContext } from "~~/context/SmartAccount";

export const AbstractButton = () => {
  const { smartAccount, provider, setSmartAccount, setProvider, connect, address, loading } =
    useContext(SmartAccountContext);

  if (address) {
    return (
      <Button className={clsx("bg-slate-800 text-white p-2 rounded-lg")}>
        {address.slice(0, 6)}...{address.slice(-5, -1)}
      </Button>
    );
  } else {
    return (
      <Button variant="outline" type="submit" onClick={connect}>
        Login with E-mail
      </Button>
    );
  }
};
