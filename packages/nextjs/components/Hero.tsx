import { AbstractButton } from "./AccountAbstraction";
import { ButtonLink } from "./Button";
import { Container } from "./Container";
import { FadeIn } from "./FadeIn";

export const Hero = () => {
  return (
    <Container className="mt-24 sm:mt-32 md:mt-56">
      <FadeIn className="max-w-3xl">
        <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
          Discover the Future of Subscriptions with Multipay.
        </h1>
        <p className="mt-6 text-xl text-neutral-600">
          At Multipay, we&apos;re rewriting the subscription experience for the modern world. Say goodbye to the hassle,
          the uncertainty, and the limitations of traditional subscription models. Say hello to a cutting-edge solution
          that&apos;s as dynamic as your business.
        </p>
        <div className="flex mt-8 gap-4">
          <AbstractButton />
          <ButtonLink href="/app"> Start App</ButtonLink>
          <ButtonLink href="/comp"> Proceed as Company</ButtonLink>
          <ButtonLink href="/subs"> Proceed as User</ButtonLink>
        </div>
      </FadeIn>
    </Container>
  );
};
