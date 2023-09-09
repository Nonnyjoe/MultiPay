import { useContext, useEffect, useState } from "react";
import { Container } from "./Container";
import { FadeIn } from "./FadeIn";
import { BigNumber, ethers } from "ethers";
import CompanyAbi from "~~/utils/CompanyAbi.json";
import FactoryAbi from "~~/utils/FactoryAbi.json";
import { SmartAccountContext } from "~~/context/SmartAccount";
import { IHybridPaymaster, PaymasterMode, SponsorUserOperationDto } from "@biconomy/paymaster";
import { useContractRead } from "wagmi";
import { FactoryAddr } from "~~/utils/FactoryAddress";
import { Address, etherUnits } from "viem";

export const CreatePlan = () => {

    const [planName, setPlanName] = useState("");
    const [planPrice, setPlanPrice] = useState("");
    const [planDuration, setPlanDuration] = useState("");
    const [CompanyAddr, setCompanyAddr] = useState<any>();
    const [owner, setOwner] = useState<Address>();

    const {provider, smartAccount} = useContext(SmartAccountContext);

    const {data: ownerToCompanyData} = useContractRead({
        address: "0xC523CC0c5F2db71a456D9a69d3f89e59258e9160",
        abi: FactoryAbi,
        functionName: "ownerToCompany",
        args: [owner],
        onSuccess(data){
            console.log(data);
            setCompanyAddr(data);
        }
    })

    useEffect(() => {
        let smAccount = smartAccount?.getSmartAccountAddress();
        setOwner(smAccount);
    }, [CompanyAddr]);

    console.log(CompanyAddr);

    const contract = new ethers.Contract("0xe2dd3E46257cc1AD413F679Caea89A560fdE3e38", CompanyAbi, provider);
    
    const createPlan = async (e: any) => {
        e.preventDefault();
        const minTx = await contract.populateTransaction.createPlan(planName, planPrice, planDuration);
        console.log(minTx.data);
        const tx1 = {
            to: CompanyAddr,
            data: minTx.data,
        };
        let userOp = await smartAccount?.buildUserOp([tx1]);
        console.log({ userOp });

        ////////////
        const biconomyPaymaster = smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
        let paymasterServiceData: SponsorUserOperationDto = {
            mode: PaymasterMode.SPONSORED,
        };
        const paymasterAndDataResponse = await biconomyPaymaster.getPaymasterAndData(
            userOp,
            paymasterServiceData
            );

        userOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;
        const userOpResponse = await smartAccount.sendUserOp(userOp);
        console.log("userOpHash", userOpResponse);
        const { receipt } = await userOpResponse.wait(1);
        console.log("txHash", receipt.transactionHash);
    }

    return(
        <Container className="mt-24 sm:mt-32 md:mt-56">
            <FadeIn className="max-w-3xl">
                <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
                    Create a Subscription Plan
                </h1>
                <form className="flex flex-col gap-3">
                    <label htmlFor="plan-name">
                        Plan Name 
                        <input 
                            type="text" 
                            name="plan-name" 
                            id="" 
                            className="border rounded-lg mx- 4 p-2"
                            onChange={(e) => {
                                setPlanName(e.target.value);
                            }} 
                        />
                    </label>
                    <label htmlFor="plan-price">
                        Plan Price 
                        <input 
                            type="text" 
                            name="plan-price" 
                            id="" 
                            className="border rounded-lg mx- 4 p-2"
                            onChange={(e) => {
                                let amount = ethers.utils.parseEther(e.target.value);
                                setPlanPrice(amount.toString());
                            }}
                        />
                    </label>
                    <label htmlFor="plan-duration">
                        Plan Duration 
                        <input 
                            type="text" 
                            name="plan-duration" 
                            id="" 
                            className="border rounded-lg mx- 4 p-2" 
                            onChange={(e) => {
                                setPlanDuration(e.target.value);
                            }}
                        />
                    </label>
                    <button 
                        type="submit" 
                        className="border p-2 rounded-lg"
                        onClick={createPlan}
                    >Create Plan</button>
                </form>
            </FadeIn>
        </Container>
    )
}