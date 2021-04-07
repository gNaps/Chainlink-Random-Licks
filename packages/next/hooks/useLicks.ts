import { useQuery } from "@apollo/client";
import { Lick } from "../models/Lick";
import { GET_ALL_LICKS } from "../utils/graphql";

const useLicks = (): Lick[] => {
  const { data } = useQuery(GET_ALL_LICKS, {
    variables: { replyTo: "" },
    pollInterval: 2000,
    fetchPolicy: "cache-and-network",
  });

  return data?.tokens || [];
};

export default useLicks;