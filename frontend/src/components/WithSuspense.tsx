import { Suspense, ComponentType, ReactNode, PropsWithChildren } from "react";

export default function withSuspense<
  T extends JSX.IntrinsicAttributes & PropsWithChildren
>(Component: ComponentType<T>, fallback?: ReactNode) {
  return (props: T) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
}
