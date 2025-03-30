import { ReactNode } from 'react';


interface ShouldPaginateWrapperProps {
    children: ReactNode;
    className?: string;
    shouldPaginate : boolean;
}

const ShouldPaginateWrapper = ({ children, className, shouldPaginate }: ShouldPaginateWrapperProps) => {
    return (
        <section className={className}>
            {shouldPaginate ? children : null}
        </section>
    );
};

export default ShouldPaginateWrapper;