import { useState } from "react";
import { Container } from "./Container";
import { FadeIn } from "./FadeIn";

export const CreatePlan = () => {

    const [planName, setPlanName] = useState("");
    const [planPrice, setPlanPrice] = useState("");
    const [planDuration, setPlanDuration] = useState("");

    const createPlan = (e: any) => {
        e.prevent.Default();
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
                        <input type="text" name="plan-name" id="" className="border rounded-lg mx- 4 p-2" />
                    </label>
                    <label htmlFor="plan-price">
                        Plan Price 
                        <input type="text" name="plan-price" id="" className="border rounded-lg mx- 4 p-2" />
                    </label>
                    <label htmlFor="plan-duration">
                        Plan Duration 
                        <input type="text" name="plan-duration" id="" className="border rounded-lg mx- 4 p-2" />
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