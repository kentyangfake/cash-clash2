"use client";

import React from "react";
import {
  QueryClientProvider,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import { fetchLegislators } from "@/utils/api";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const useLegislator = () =>
  useQuery({
    queryKey: ["Legislators"],
    queryFn: () => fetchLegislators(),
  });

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: { staleTime: 86400000, cacheTime: 86400000 * 3 },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
