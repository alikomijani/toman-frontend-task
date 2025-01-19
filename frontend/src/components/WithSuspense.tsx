import { Suspense, ComponentType } from "react";
import PageLoading from "./PageLoading";

export function WithSuspense<T extends JSX.IntrinsicAttributes>(
  Component: ComponentType<T>
) {
  return (props: T) => (
    <Suspense fallback={<PageLoading />}>
      <Component {...props} />
    </Suspense>
  );
}
