import { createContext, useContext, ReactNode } from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';

interface FadeInProps {
    children: ReactNode;
    className: string
}

const FadeInStaggerContext = createContext<boolean>(false);

const viewport = { once: true, margin: '0px 0px -200px' };

export function FadeIn({ children , className }: FadeInProps) {
    const shouldReduceMotion = useReducedMotion();
    const isInStaggerGroup = useContext(FadeInStaggerContext);

    return (
        <motion.div
            variants={fadeInVariants}
            transition={{ duration: 0.5 }}
            {...(isInStaggerGroup
                ? {}
                : {
                    initial: 'hidden',
                    animate: 'visible',
                    exit: 'hidden',
                    whileHover: 'visible',
                    viewport,
                })}
        >
            {children}
        </motion.div>
    );
}

interface FadeInStaggerProps {
    children: ReactNode;
    faster?: boolean;
}

export function FadeInStagger({ faster = false, children }: FadeInStaggerProps) {
    return (
        <FadeInStaggerContext.Provider value={true}>
            <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover="visible"
                viewport={viewport}
                transition={{ staggerChildren: faster ? 0.12 : 0.2 }}
            >
                {children}
            </motion.div>
        </FadeInStaggerContext.Provider>
    );
}

const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0 },
};
