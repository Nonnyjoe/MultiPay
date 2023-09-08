import { Container } from "./Container";
import { FadeIn } from "./FadeIn";

export const CreateOrganization = () => {
    return(
        <Container className="mt-24 sm:mt-32 md:mt-56">
            <FadeIn className="max-w-3xl">
                <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
                    Create an Organization
                </h1>
                <div>
                    <label htmlFor="organization-name">
                        Organization Name 
                        <input type="text" name="organization-symbol" id="" />
                    </label>
                    <label htmlFor="organization-symbol">
                        Organization Symbol 
                        <input type="text" name="organization-symbol" id="" />
                    </label>
                </div>
            </FadeIn>
        </Container>
    )
}