import { ReactNode } from "react";

interface RenderByConditionProps {
    condition: boolean | undefined | null;
    children: ReactNode;
}


export function RenderByCondition({ condition, children }: RenderByConditionProps) {


    return (
        <>
            {(!!condition && condition) && (
                children
            )}
        </>
    )

} 