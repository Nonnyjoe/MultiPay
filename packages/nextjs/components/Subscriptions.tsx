import { Container } from "./Container";
import { FadeIn } from "./FadeIn";

export const Subscriptions = () => {
    return(
        <Container className="mt-24 sm:mt-32 md:mt-56">
            <FadeIn className="max-w-3xl">
                <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
                    Here are your availiable subscriptions
                </h1>
            </FadeIn>
        </Container>
    )
}