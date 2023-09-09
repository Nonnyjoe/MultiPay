import { useState } from "react";
import { Container } from "./Container";
import { FadeIn } from "./FadeIn";
import { ethers } from "ethers";
import { FactoryAddr } from "~~/utils/FactoryAddress";
import FactoryAbi from "../utils/FactoryAbi.json";

export const CreateOrganization = () => {

    const [organizationName, setOrganizationName] = useState("");
    const [organizationSymbol, setOrganizationSymbol] = useState("");


    // const contract = new ethers.Contract(FactoryAddr(), FactoryAbi, provider);


    const createOrganization = (e: any) => {
        e.preventDefault();
    }

    return(
        <Container className="mt-24 sm:mt-32 md:mt-56">
            <FadeIn className="max-w-3xl">
                <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
                    Create an Organization
                </h1>
                <form className="flex flex-col gap-3">
                    <label htmlFor="organization-name">
                        Organization Name 
                        <input 
                            type="text" 
                            name="organization-symbol" 
                            id="" 
                            className="border rounded-lg mx- 4 p-2" 
                            onChange={(e) => {setOrganizationName(e.target.value)}}
                        />
                    </label>
                    <label htmlFor="organization-symbol">
                        Organization Symbol 
                        <input 
                            type="text" 
                            name="organization-symbol" 
                            id="" 
                            className="border rounded-lg mx- 4 p-2" 
                            onChange={(e) => {setOrganizationSymbol(e.target.value)}}
                        />
                    </label>
                    <button 
                        type="submit" 
                        onClick={createOrganization}
                        className="m-0 p-2 border rounded-lg"
                    >Create Organization</button>
                </form>
            </FadeIn>
        </Container>
    )
}