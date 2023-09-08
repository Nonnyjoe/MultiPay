import clsx from 'clsx';
import { CSSProperties, ReactNode, StyleHTMLAttributes } from 'react';

interface ContainerProps {
    className?: string;
    children?: ReactNode;
    style?: CSSProperties;
}

export function Container({ className, children, style }: ContainerProps) {
    return (
        <div className={clsx('mx-auto max-w-7xl px-6 lg:px-8', className)}>
            <div
                className="mx-auto max-w-2xl lg:max-w-none"
                style={style}
            >{children}</div>
        </div>
    );
}