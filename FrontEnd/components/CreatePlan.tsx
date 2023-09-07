import { Container } from "./Container";
import { FadeIn } from "./FadeIn";

export const CreatePlan = () => {
    return(
        <Container className="mt-24 sm:mt-32 md:mt-56">
            <FadeIn className="max-w-3xl">
                <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
                    Create a Subscription Plan
                </h1>
                <div>
                    <p>Product</p>
                    <p>Category</p>
                    <p>Monthly or yearly</p>
                </div>
            </FadeIn>
        </Container>
    )
}