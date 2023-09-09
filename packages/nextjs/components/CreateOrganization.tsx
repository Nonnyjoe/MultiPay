import { useContext, useState } from "react";
import FactoryAbi from "../utils/FactoryAbi.json";
import { Button } from "./Button";
import { Container } from "./Container";
import { FadeIn } from "./FadeIn";
import { IHybridPaymaster, PaymasterMode, SponsorUserOperationDto } from "@biconomy/paymaster";
import { ethers } from "ethers";
import { SmartAccountContext } from "~~/context/SmartAccount";
import { FactoryAddr } from "~~/utils/FactoryAddress";

export const CreateOrganization = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [organizationSymbol, setOrganizationSymbol] = useState("");

  const { provider, smartAccount } = useContext(SmartAccountContext);

  const contract = new ethers.Contract(FactoryAddr(), FactoryAbi, provider);

  const createOrganization = async (e: any) => {
    e.preventDefault();
    const minTx = await contract.populateTransaction.createCompany(
      organizationName,
      organizationSymbol,
      "0xe2dd3E46257cc1AD413F679Caea89A560fdE3e38",
    );
    console.log(minTx.data);
    const tx1 = {
      to: FactoryAddr(),
      data: minTx.data,
    };
    const userOp = await smartAccount?.buildUserOp([tx1]);
    console.log({ userOp });

    const biconomyPaymaster = smartAccount?.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
    const paymasterServiceData: SponsorUserOperationDto = {
      mode: PaymasterMode.SPONSORED,
    };
    const paymasterAndDataResponse = await biconomyPaymaster.getPaymasterAndData(userOp, paymasterServiceData);

    userOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;
    const userOpResponse = await smartAccount.sendUserOp(userOp);
    console.log("userOpHash", userOpResponse);
    const { receipt } = await userOpResponse.wait(1);
    console.log("txHash", receipt.transactionHash);
  };

  return (
    <Container className="mt-14 sm:mt-32 md:mt-56">
      <FadeIn className="max-w-3xl">
        <form className="flex flex-col bg-white p-8 rounded-lg gap-6">
          <h1 className="font-medium font-display text-5xl tracking-tight text-neutral-950 [text-wrap:balance]">
            Create an Organization
          </h1>
          <div className="flex flex-col">
            <label htmlFor="organization-name">Organization Name</label>
            <input
              type="text"
              name="organization-symbol"
              id=""
              className="border rounded-lg mx- 4 p-2"
              onChange={e => {
                setOrganizationName(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="organization-symbol">Organization Symbol</label>
            <input
              type="text"
              name="organization-symbol"
              id=""
              className="border rounded-lg mx- 4 p-2"
              onChange={e => {
                setOrganizationSymbol(e.target.value);
              }}
            />
          </div>
          <Button type="submit" onClick={createOrganization} className="m-0 p-2 border rounded-lg">
            Create Organization
          </Button>
        </form>
      </FadeIn>
    </Container>
  );
};
