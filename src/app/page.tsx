import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import Compare from "./compare";
import { fetchLegislators } from "@/utils/api";

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["Legislators"], fetchLegislators);
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <Compare />
    </Hydrate>
  );
}
