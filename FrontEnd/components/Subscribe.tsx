import { Container } from "./Container";
import { FadeIn } from "./FadeIn";

export const Subscribe = () => {
    return(
        <Container className="mt-24 sm:mt-32 md:mt-56">
            <FadeIn className="max-w-3xl">
                <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
                    Subscribe to any of the availiable services.
                </h1>
                <div>
                    <p>DSTV</p>
                </div>
                <div>
                    <p>MTN</p>
                </div>
                <div>
                    <p>GLO</p>
                </div>
            </FadeIn>
        </Container>
    )
}