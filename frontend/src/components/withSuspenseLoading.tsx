import { ComponentType, Suspense } from "react";
import PageLoading from "./PageLoading";

export default function withSuspenseLoading<T extends JSX.IntrinsicAttributes>(
  Component: ComponentType<T>
) {
  return (props: T) => (
    <Suspense fallback={<PageLoading />}>
      <Component {...props} />
    </Suspense>
  );
}
