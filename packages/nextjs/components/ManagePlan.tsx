import { Container } from "./Container";
import { FadeIn } from "./FadeIn";

export const ManagePlan = () => {
    return(
        <Container className="mt-24 sm:mt-32 md:mt-56">
            <FadeIn className="max-w-3xl">
                <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
                    Manage users subscription
                </h1>
                <div>
                <div className="border m-0 p-4 gap-4 rounded-lg">
                    <p>DSTV</p>
                    <p>Total subscribers: 50</p>
                </div>
                <div className="border m-0 p-4 gap-4 rounded-lg">
                    <p>MTN</p>
                    <p>Total subscribers: 300</p>
                </div>
                </div>
                
            </FadeIn>
        </Container>
    )
}